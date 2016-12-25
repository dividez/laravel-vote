<?php

namespace App\Http\Controllers\Admin;

use App\Store\AdminStore;
use App\Tools\Common;
use Gregwar\Captcha\CaptchaBuilder;
use Gregwar\Captcha\PhraseBuilder;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AdminLoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.login');
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
            'name.required' => '用户名不能为空!',
            'password.required' => '密码不能为空!',
            'captcha.required' => '验证码不能为空!',
        ];
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'password' => 'required',
            'captcha' => 'required',
        ], $messages);
        if ($validator->fails()) return back()->withErrors($validator)->withInput();
        if ($data['captcha'] != \Session::get('code')) return back()
            ->withErrors('验证码错误!')
            ->with('name', $data['name']);
        $datas['name'] = $data['name'];
        $datas['password'] = Common::passMcrypt($data['password']);
        $result = AdminStore::find($datas);
        if ($result){
            // 储存用户信息
            \Session::put('user_login', $result);
            return redirect('/admin');
        }
        return back()->withErrors('登陆失败!');
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

    /**
     * @param $tmp
     * @author zhangpengyi
     */
    public function captcha($tmp)
    {

        $phrase = new PhraseBuilder;
        $code = $phrase->build(4);
        //生成验证码图片的Builder对象，配置相应属性
        $builder = new CaptchaBuilder($code, $phrase);
        //设置背景颜色
        $builder->setBackgroundColor(220, 220, 220);
        $builder->setMaxAngle(25);
        $builder->setMaxBehindLines(0);
        $builder->setMaxFrontLines(0);
        //可以设置图片宽高及字体
        $builder->build($width = 100, $height = 40, $font = null);
        //获取验证码的内容
        $phrase = $builder->getPhrase();
        // dd($phrase);
        //把内容存入session
        \Session::flash('code', $phrase);
        //生成图片
        header("Cache-Control: no-cache, must-revalidate");
        header("Content-Type:image/jpeg");
        $builder->output();
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @author zhangpengyi
     */
    public function register()
    {
        return view('admin.register');
    }

    /**
     * @param Request $request
     * @return $this|\Illuminate\Http\RedirectResponse
     * @author zhangpengyi
     */
    public function checkRegister(Request $request)
    {
        $data = $request->all();
        $messages = [
            'name.required' => '用户名不能为空!',
            'name.numeric' => '用户名必须为数字！',
            'email.required' => '邮箱不能为空!',
            'password.required' => '密码不能为空!',
            'password.min' => '密码最少6位!',
            'password.max' => '密码最多18位!',
            'password_confirmation.required' => '确认密码不能为空!',
            'password_confirmation.min' => '密码最少6位!',
            'password_confirmation.max' => '密码最多18位!',
            'email.email' => '邮箱格式不正确!',
        ];
        $validator = Validator::make($request->all(), [
            'name' => 'required|numeric',
            'email' => 'required|email',
            'password' => 'required|min:6|max:18',
            'password_confirmation' => 'required|min:6|max:18',
        ], $messages);

        if ($validator->fails()) return back()->withErrors($validator)->withInput();
        if ($data['password'] != $data['password_confirmation']) return back()->withErrors(['password_confirmation' =>'两次密码不一致'])->withInput();
        $datas['guid'] = Common::getUuid();
        $datas['name'] = $data['name'];
        $datas['password'] = Common::passMcrypt($data['password']);
        $datas['email'] = $data['email'];
        $datas['status'] = 1;
        $datas['addtime'] = time();
        $datas['ip'] = $request->ip();
        //验证用户名唯一性
        $registerUser = AdminStore::find(['name' => $datas['name']]);
        if ($registerUser) return back()->withErrors('用户名重复，注册失败！')->withInput();
        $result = AdminStore::insert($datas);
        if ($result){
            \Session::flash('success', '注册成功！');
            return back();
        }
        return back()->withErrors('注册失败！')->withInput();
    }

    /**
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     * @author zhangpengyi
     */
    public function out()
    {
        //删除session
        \Session::forget('user_login');
        return redirect('/');
    }
}
