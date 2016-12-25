<?php
/**
 * Created by PhpStorm.
 * User: 张鹏翼
 * Date: 2016/12/25
 * Time: 18:17
 */

namespace App\Store;


class IpStore
{
    private static $table = 'data_ip';

    public static function getAll($param)
    {
        return \DB::table(self::$table)->where($param)->get();
    }

    public static function count($param)
    {
        return \DB::table(self::$table)->where($param)->count();
    }

    public static function insert($param)
    {
        return \DB::table(self::$table)->insert($param);
    }

    public static function find($param)
    {
        return \DB::table(self::$table)->where($param)->first();
    }
    public static function value($where = [], $columns = '')
    {
        return \DB::table(self::$table)->where($where)->value($columns);
    }
}