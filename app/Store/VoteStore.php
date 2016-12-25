<?php
/**
 * Created by PhpStorm.
 * User: 张鹏翼
 * Date: 2016/12/25
 * Time: 15:26
 */

namespace App\Store;


class VoteStore
{
    private static $table = 'data_vote';

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

    public static function select($columns = ['*'])
    {
        return \DB::table(self::$table)->select($columns)->where('endTime','>',time())->orderBy('addtime', 'desc')->get();
    }
}