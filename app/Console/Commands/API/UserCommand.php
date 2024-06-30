<?php

namespace App\Console\Commands\API;

use App\Http\Filters\SubOperationFilter;
use App\Models\API\Operation;
use App\Models\API\SubOperation;
use App\Services\API\OperationService;
use GdFont;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Request;

class UserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'api:user-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command for test task';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $per_page = 1000;
        $start = microtime(true);

        $page_limit = intdiv(Operation::count(), $per_page);

        for($page = 1; $page <= $page_limit; ++$page) {
            $request = Request::create("api/v1/sub_operations?page=$page&per_page=$per_page", 'GET');
            $response = json_decode(app()->handle($request)->getContent());
            
            if (!isset($response->data) || is_null($response->data)) {
                continue;
            }
            \DB::beginTransaction();
            try{
                $sub_operations = [];
                foreach($response->data as $item){
                    $sub_operations[] = $item;
                }
                $sub_operations = collect($sub_operations);
                $sub_operations_count = $sub_operations->count();
                $sub_operations = $sub_operations->filter( function($value, $_){return $value->number % 2 == 0 && $value->number > 2;});

                $ids = [];
                $sub_operations->each(function ($value, $_) use(&$ids) {
                    $ids[] = $value->operation_id;
                });

                $operations = Operation::findMany(array_unique($ids));
                $operations = $operations->sortBy('name');
                $service = new OperationService();
                if (method_exists($operations, 'count') && $operations->count() > 1) {
                    $service->delete($operations[1], false);

                }
                if (method_exists($operations, 'count') && $operations->count() > 3) {
                    $service->delete($operations[3], false);
                }
                $sub_operations = $sub_operations->filter(function ($value, $_) {
                    return $value->number > 4 && preg_match('*A*', $value->name);
                });
                Operation::findMany($sub_operations->get('operation_id'))->each(function(Operation $operation, $_) use ($service) {
                    $service->delete($operation, false);
                });
                \DB::commit();
                dump($page . '-' . $sub_operations_count - $sub_operations->count());
            } catch(\Exception $e){
                \DB::rollBack();
                dump($e->getMessage());
            }
            
        }
        dump(microtime(true) - $start);
    }
}