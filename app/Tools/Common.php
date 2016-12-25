<?php
/**
 * Created by PhpStorm.
 * User: 张鹏翼
 * Date: 2016/12/25
 * Time: 10:05
 */

namespace App\Tools;



use Ramsey\Uuid\Uuid;

class Common
{
    /**
     * 密码加密
     * @param $pass
     * @return string
     * @author zhangpengyi
     */
    public static function passMcrypt($pass)
    {
        return md5(md5($pass).substr($pass, 0, 2).'zhangpengyi');
    }

    /**
     * 生成uuid
     * @return mixed
     * @author zhangpengyi
     */
    public static function getUuid()
    {
        //生成uuid
        $temp = Uuid::uuid1();
        $uuid = $temp->getHex();#uuid
        return $uuid;
    }
}