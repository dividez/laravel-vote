<?php

namespace App\Http\Controllers;

use App\Store\IpStore;
use App\Store\OptionStore;
use App\Store\VoteStore;
use App\Tools\Common;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $datas = VoteStore::select();
        return view('admin.home.index', ['datas' => $datas]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $data = $request->all();
        $datas['addtime'] = time();
        $datas['vote_guid'] = $data['vote_guid'];
        $datas['ip'] = $request->ip();
        $vote = VoteStore::find(['guid' => $data['vote_guid']]);
        $addTimeIp =IpStore::value(['vote_guid' => $data['vote_guid'] ,'ip' => $datas['ip']],'addtime');
        switch ($vote->iplimit) {
            case 12:
                if ($addTimeIp + 12*3600 > time()) return back()->withErrors('投票失败！同一个IP地址在12小时之内只能投一次');
                break;
            case 24:
                if ($addTimeIp + 12*3600 > time()) return back()->withErrors('投票失败！同一个IP地址在24小时之内只能投一次');
                break;
            case 48:
                if ($addTimeIp + 12*3600 > time()) return back()->withErrors('投票失败！同一个IP地址在48小时之内只能投一次');
                break;
        }
        try {
            \DB::beginTransaction();
            foreach ($data['option_guid'] as $key => $val) {
                //选项表自增
                OptionStore::incrNumber($val);
                $datas['guid'] = Common::getUuid();
                $datas['option_guid'] = $val;
                //ip表插入
                IpStore::insert($datas);
            }
            \DB::commit();
            \Session::flash('success', '投票成功！');
            return redirect('/show/' . $data['vote_guid']);
        } catch (Exception $e) {
            \DB::rollBack();
            return back()->withErrors('投票失败！');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $where['guid'] = $id;
        $vote = VoteStore::find($where);
        $option = OptionStore::getAll(['vote_guid' => $id]);
        //一共总数
        $allNum = IpStore::count(['vote_guid' => $vote->guid]);
        foreach ($option as $val) {
            //单条总数
            $num = $val->number;
            //比例
            if ($allNum != 0) {
                $val->proportion = ceil($num / $allNum * 100);
            } else {
                $val->proportion = 0;
            }
        }
        return view('admin.home.show', ['dataNav' => $vote, 'data' => $option, 'allNum' => $allNum]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
