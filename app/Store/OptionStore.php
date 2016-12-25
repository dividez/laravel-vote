<?php
/**
 * Created by PhpStorm.
 * User: 张鹏翼
 * Date: 2016/12/25
 * Time: 16:00
 */

namespace App\Store;


class OptionStore
{
    private static $table = 'data_option';

    public static function insert($param)
    {
        return \DB::table(self::$table)->insert($param);
    }

    public static function find($param)
    {
        return \DB::table(self::$table)->where($param)->first();
    }

    public static function getAll($param)
    {
        return \DB::table(self::$table)->where($param)->get();
    }

    public static function incrNumber($guid)
    {
        \DB::table(self::$table)->where('guid',$guid)->increment('number',1);
    }
}