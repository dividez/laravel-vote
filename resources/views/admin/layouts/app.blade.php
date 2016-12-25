<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="theme-color" content="#52768e">
    @section('title')<title>用户注册</title>@show
    <link href="//cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
    @include('admin.public.style')
    @yield('styles')
    @include('admin.public.script')
    <style>
        .navbar-nav>li>a {
            font-weight: 500;
            color: #ffffff;
        }
    </style>
</head>
<body>
<header class="main-header" style="background-color: #6f5499;">
    <div class="container">
        <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
            <ul class="nav navbar-nav">
                <li>
                    <a href="/">投票</a>
                </li>
            </ul>
            @if(empty(\Session::get('user_login')))
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="{{ url('/login') }}" target="_blank">登录</a></li>
                    <li><a href="{{ url('/register') }}" target="_blank">注册</a></li>
                </ul>
                @else
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="{{ url('/admin') }}" target="_blank">后台管理 </a>
                    </li>
                </ul>
            @endif

        </nav>
    </div>
</header>
<div id="content-wrap">
    <div class="container">
        @yield('content')
    </div>
</div>
</body>
</html>
