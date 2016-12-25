<?php
/**
 * Created by PhpStorm.
 * User: 张鹏翼
 * Date: 2016/12/25
 * Time: 13:44
 */

namespace App\Store;


class AdminStore
{
    private static $table = 'data_admin';

    public static function insert($param)
    {
        return \DB::table(self::$table)->insert($param);
    }

    public static function find($param)
    {
        return \DB::table(self::$table)->where($param)->first();
    }
}