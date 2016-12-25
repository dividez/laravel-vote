<?php

namespace App\Http\Controllers\Admin;

use App\Store\OptionStore;
use App\Store\VoteStore;
use App\Tools\Common;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.vote.index');
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $messages = [
            'title.required' => '标题不能为空!',
            'description.required' => '描述名不能为空!',
            'option.required' => '选项不能为空!',
            'radio.required' => '单选/多选不能为空!',
        ];
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'option' => 'required',
            'radio' => 'required',
        ], $messages);

        if ($validator->fails()) return back()->withErrors($validator);
        if (empty($arr1=array_filter ($data['option']))) return back()->withErrors('投票选项不能为空');
        $datas['guid'] = Common::getUuid();
        $datas['admin_guid'] = \Session::get('user_login')->guid;
        $datas['addtime'] = time();
        $datas['startTime'] = empty($data['startTime']) ? time() :strtotime($data['startTime'])  ;
        $datas['endTime'] = empty($data['endTime']) ? '':strtotime($data['endTime']);
        $datas['radio'] = $data['radio'];
        $datas['iplimit'] = $data['ip'];
        $datas['title'] = $data['title'];
        $datas['description'] = $data['description'];
        $datas['status'] = 1;
        $option['vote_guid'] = $datas['guid'];
        $option['admin_guid'] = \Session::get('user_login')->guid;
        try {
            \DB::beginTransaction();
            VoteStore::insert($datas);
            foreach ($data['option'] as $key => $val){
                $option['guid'] = Common::getUuid();
                $option['option'] = $val;
                OptionStore::insert($option);
            }
            \DB::commit();
            \Session::flash('success', '发布成功！');
            return back();
        } catch (Exception $e) {
            \DB::rollBack();
            return back()->withErrors('发布失败！')->withInput();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function lists()
    {
        $userGuid = \Session::get('user_login')->guid;
        $where['admin_guid'] = $userGuid;
        $where['status'] = 1;
        $result = VoteStore::getAll($where);
        return view('admin.vote.posts',['data' => $result]);
    }

    /**
     * @param Request $request
     * @param $id
     * @author zhangpengyi
     */
    public function updateVote(Request $request,$id)
    {
        $where['guid'] = $id;
        $vote = VoteStore::find($where);
        $option = OptionStore::getAll(['vote_guid' => $id]);
//        dd($option);
        return view('admin.vote.index',['vote' => $vote,'option' => $option]);
    }
}
