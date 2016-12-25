<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="Access-Control-Allow-Origin" content="*">
    @section('title')<title>投票系统后台</title>@show
    <!-- Tell the browser to be responsive to screen width -->
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>

    @include('admin.public.style')
    @yield('styles')
    @include('admin.public.script')
    <style>
        .error{
            color : #ff5515;
        }
        .loading-indicator {
            height: 100%;
            width: 100%;
            background: url( '../images/loading.gif' );
            background-repeat: no-repeat;
            background-position: center center;
        }

        .loading-indicator-overlay {
            background-color: #FFFFFF;
            opacity: 0;
            filter: alpha(opacity = 60);
            width: 100%;
            height: 100%;
        }
    </style>
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="{{ asset('js/html5shiv.min.js') }}"></script>
    <script src="{{ asset('js/respond.min.js')  }}"></script>
    <![endif]-->
</head>
<body class="skin-blue sidebar-mini" id="Loading">

<div class="wrapper">

@include('admin.public.header')
<!-- Left side column. contains the logo and sidebar -->
@include('admin.public.aside')

<!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        @yield('content')
        <div id="@yield('form-id')" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">@yield('form-title')</h4>
                    </div>
                    <div class="modal-body">
                        @yield('form-body')
                    </div>
                    <div class="modal-footer">
                        @yield('form-footer')
                    </div>
                </div>
            </div>
        </div>
    </div><!-- /.content-wrapper -->

@include('admin.public.footer')

<!-- Control Sidebar -->
{{--@include('admin.public.sidebar')--}}
<!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed
         immediately after the control sidebar -->
    <div class='control-sidebar-bg'></div>
</div><!-- ./wrapper -->
<script>
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
</script>
@yield('script')

</body>
</html>
