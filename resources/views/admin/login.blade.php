<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>投票系统登录</title>
    <link rel="stylesheet" href="{{url('bootstrap/css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{url('css/bootstrap-theme.min.css')}}">
    <link rel="stylesheet" href="{{url('css/login.css')}}">
</head>
<body>
<div class="container">
    <div class="main">
        <div class="center">
            <div class="title">投票系统登录</div>
            <!-- 登录 -->
            <form action="/login" method="post">
            <div class="form from1" id='form1'>
                <div class="form-line">
                    <input type="text" class='form-control bg bg-user' placeholder='手机号' name="name" style="color:#000;">
                </div>
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <div class="form-line">
                    <input type="password" class='form-control bg  bg-pwd' placeholder='密码' name="password" style="color:#000;">
                    @if (count($errors) > 0)
                        <ul>
                            @foreach ($errors->all() as $error)
                                <p class="errorMsg">{{ $error }}</p>
                            @endforeach
                        </ul>
                    </div>
                    @endif
                    {{--<div class="errorMsg">密码错误</div>--}}
                </div>
                <div class="form-line" style='height:60px;'>
                    <input type="text" style='width:160px;padding-left:20px;' class='form-control' placeholder='验证码' name="captcha" >
                    <a onclick="javascript:re_captcha();"><img src="{{ URL('/code/captcha/1') }}" alt="验证码" title="刷新图片"
                                                               width="100" height="35" id="c2c98f0de5a04167a9e427d883690ff6"
                                                               border="0" style='float: right;position: absolute;top:0px;right:0;height:44px;'></a>

                </div>




                <div class="form-line" style='height:60px;'>
                    <button class="btn btn-block " style='background-color:#52a7fa;color:#fff;'  type="submit">登录</button>
                </div>
            </form>
            </div>
        </div>
    </div>
</div>
{{--<script src="{{url('dist/js/login.js')}}"></script>--}}
<script type="text/javascript">
    function re_captcha() {
        $url = "{{ URL('/code/captcha') }}";
        $url = $url + "/" + Math.random();
        document.getElementById('c2c98f0de5a04167a9e427d883690ff6').src = $url;
    }
</script>
<div class="modal-dialog" id="error" style="display:none;">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            </button>
            <h4 class="modal-title">提示框</h4>
        </div>
        <div class="modal-body">
            <p>错误</p>
        </div>
        <div class="modal-footer">

            <button type="button" class="btn btn-primary">确认</button>
        </div>
    </div>
    <!-- /.modal-content -->
</div>
</body>
</html>