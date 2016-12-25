@extends('admin.layouts.master')
@section('title')
    <title>发起投票</title>
@endsection
@section('styles')
    <style>
        #wizard .anchor li{
            position: relative;
            display: block;
            margin: 0;
            padding: 0 3px;
            border: 0 solid #E0E0E0;
            float: left;
        }
        #wizard ul.anchor li a.selected {
            color: #F8F8F8;
            background: #EA8511;
            border: 1px solid #EA8511;
            cursor: text;
            -moz-box-shadow: 5px 5px 8px #888;
            -webkit-box-shadow: 5px 5px 8px #888;
            box-shadow: 5px 5px 8px #888;
        }
        #wizard ul.anchor li a {
            display: block;
            position: relative;
            float: left;
            margin: 5px 0 0 0;
            padding: 3px;
            height: 60px;
            width: 230px;
            text-decoration: none;
            outline-style: none;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            z-index: 99;
        }
        #wizard ul.anchor li a.disabled {
            color: #CCCCCC;
            background: #F8F8F8;
            border: 1px solid #CCC;
            cursor: text;
        }
        .swMain ul.anchor li a .stepNumber {
            position: relative;
            float: left;
            width: 30px;
            text-align: center;
            padding: 0 5px 5px;
            font: bold 45px Verdana, Arial, Helvetica, sans-serif;
        }
        .swMain ul.anchor li a .stepDesc small {
            font: normal 12px Verdana, Arial, Helvetica, sans-serif;
        }
        .swMain ul.anchor li a .stepDesc {
            position: relative;
            display: block;
            float: left;
            text-align: left;
            padding: 5px;
            font: bold 20px Verdana, Arial, Helvetica, sans-serif;
        }
        .swMain ul.anchor {
            position: relative;
            display: block;
            float: left;
            list-style: none;
            padding: 0;
            margin: 10px 0;
            clear: both;
            border: 0 solid #CCCCCC;
            background: transparent;
        }
        .first_title{
            margin-bottom:20px;
            border-bottom:1px solid #ddd;
            font-size:20px;
            height:76px;
            line-height:76px;
        }
    </style>
@endsection
@section('content')

    <!-- Content Header (Page header) -->
    <section class="content-header" >
        <h1>
            <i class="fa fa-calendar"></i>
            发起投票
        </h1>
        <ol class="breadcrumb">
            <li><a href="/"><i class="fa fa-dashboard"></i> 后台首页</a></li>
            <li class="active">发起投票</li>
        </ol>
    </section>
    @include('admin.partials.errors')
    @include('admin.partials.success')
    <!-- Main content -->
    <section class="content" >
        <div class="row">
            <div class="col-xs-12">
                <div class="box box-primary">

                    <form action="/admin" method="post" class="form-horizontal" enctype="multipart/form-data" id="bookss" >
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <div id="step-1" style="display: block;">
                            <p class="first_title">第一步:创建投票活动</p>
                            <div class="box-body">
                                <table id="example1" class="table table-bordered table-striped table-hover">
                                    <tbody>
                                    <tr>
                                        <th width="150">投票活动标题</th>
                                        <td>
                                            <input type="text" class="form-control" name="title" maxlength="50" id="tbTitle" style="width:400px;" value="{{empty($vote->title) ? '' :$vote->title}}">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th width="150">投票活动描述</th>
                                        <td>
                                            <textarea name="description" type="text" maxlength="300" id="tbTitle" style="width:400px;" class="form-control" rows="6">{{empty($vote->description) ?'':$vote->description}}</textarea>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div><!-- /.box-body -->
                        </div>
                        <!--第二步 -->
                        <div id="step-2" style="display: block;">
                            <p class="first_title">第二步:添加投票选项</p>
                            <table id="example2" class="example2 table table-bordered table-striped table-hover">
                                <tbody>
                                <tr>
                                    <th width="190">选项</th>
                                    <td>
                                        <table id="contentOptions">
                                            <tbody>
                                            @if(empty($option))
                                            <tr>
                                                <td class="TdOptionTitle">
                                                    <input type="text" class="form-control" name="option[]" maxlength="50" id="tbTitle" style="width:400px;">
                                                </td>
                                                <td>
                                                    <a href="javascript:;" class="MoveUp" title="排序上移">
                                                        <span class="glyphicon glyphicon-arrow-up"></span>

                                                    </a>
                                                    <a href="javascript:;" class="MoveDown" title="排序下移">
                                                        <span class="glyphicon glyphicon-arrow-down"></span>
                                                    </a>
                                                    <a href="javascript:;" class="Remove" title="删除">
                                                        <span class="glyphicon glyphicon-remove-sign"></span>
                                                    </a>
                                                </td>
                                            </tr>
                                            @else
                                                @foreach($option as $value)
                                                    <tr>
                                                        <td class="TdOptionTitle">
                                                            <input type="text" class="form-control" name="option[]" maxlength="50" id="tbTitle" style="width:400px;" value="{{$value->option}}">
                                                        </td>
                                                        <td>
                                                            <a href="javascript:;" class="MoveUp" title="排序上移">
                                                                <span class="glyphicon glyphicon-arrow-up"></span>

                                                            </a>
                                                            <a href="javascript:;" class="MoveDown" title="排序下移">
                                                                <span class="glyphicon glyphicon-arrow-down"></span>
                                                            </a>
                                                            <a href="javascript:;" class="Remove" title="删除">
                                                                <span class="glyphicon glyphicon-remove-sign"></span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                @endforeach
                                            @endif
                                            </tbody>
                                        </table>
                                        <a href="javascript:;" class="AddOption Add"><span class="glyphicon glyphicon-plus-sign"></span>添加选项</a>
                                        <span>当前版本限制：每个投票活动最多30个候选项。</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th width="150">单选/多选</th>
                                    <td>
                                        <label class="radio-inline">
                                            <input type="radio"  {{!empty($vote->radio)==1?'checked':''}} name="radio" id="inlineRadio1" value="1"> 单选
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" {{!empty($vote->radio)==2?'checked':''}} name="radio" id="inlineRadio2" value="2"> 多选
                                        </label>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--第三步 -->
                        <div id="step-3" style="display: block;">
                            <p class="first_title">第三步:功能选项设置</p>
                            <table id="example3" class="table table-bordered table-striped table-hover">
                                <tbody>
                                <tr>
                                    <th width="190">投票开始时间</th>
                                    <td>
                                        <div class="radio">
                                            <input style="width: 148.4px; height: 20.4px;display: initial;" type="text" name="startTime" value="{{empty($vote->startTime) ? '' :date('Y-m-d',$vote->startTime) }}" class="form-control " id="start"/><span>默认为当前时间</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th width="190">投票结束时间</th>
                                    <td>
                                        <div class="radio">
                                               <input style="width: 148.4px; height: 20.4px;display: initial;" type="text" name="endTime" value="{{empty($vote->endTime) ? '' :date('Y-m-d', $vote->endTime)}}" class="form-control " id="end"/><span>不填则永久有效</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th width="190">IP限制</th>
                                    <td>
                                        <div class="radio">
                                            <select name="ip" style="width: 230px; height: 30px;display: initial;" class="form-control">
                                                <option value="0" {{!empty($vote->iplimit)==0?'selected':''}}>不限</option>
                                                <option value="12" {{!empty($vote->iplimit)==12?'selected':''}}>12小时之内不能重复</option>
                                                <option value="24" {{!empty($vote->iplimit)==24?'selected':''}}>24小时之内不能重复</option>
                                                <option value="48" {{!empty($vote->iplimit)==48?'selected':''}}>48小时之内不能重复</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <a href="javascript:;"><button type="submit" alt="" class="btn btn-default btn-success "> &nbsp;完成 &nbsp;</button></a>
                    </form>
                </div><!-- /.box -->
            </div><!-- /.col -->
        </div><!-- /.row -->
    </section><!-- /.content -->
@endsection
@section('script')
    <script type="text/javascript">
        var newOption = '<tr><td class="TdOptionTitle"><input type="text" class="form-control" name="option[]" maxlength="50" id="tbTitle" style="width:400px;"> </td> <td> <a href="javascript:;" class="MoveUp" title="排序上移"> <span class="glyphicon glyphicon-arrow-up"></span> </a> <a href="javascript:;" class="MoveDown" title="排序下移"> <span class="glyphicon glyphicon-arrow-down"></span> </a> <a href="javascript:;" class="Remove" title="删除"> <span class="glyphicon glyphicon-remove-sign"></span> </a> </td> </tr>'
        $('.AddOption').on('click',function () {
            var configMaxOptionCount = 30;
            var optionsCount=$(this).closest(".example2").find("table td.TdOptionTitle input:text").length;
            if (optionsCount>=configMaxOptionCount) {
                return;
            }

            $('#contentOptions').append(newOption);
        });
        //移除选项
        $('.example2').on("click" , ".Remove",function() {
            //移除
            $(this).parent("td").parent("tr").remove();
        });
        //向上移动
        $('.example2').on("click" ,".MoveUp", function() {
            $(this).closest('tr').insertBefore($(this).closest('tr').prev());
        });

        //向下移动
        $('.example2').on("click" ,".MoveDown", function() {
            $(this).closest('tr').insertAfter($(this).closest('tr').next());
        });

        // 日历
        $('#start').daterangepicker({
            timePicker: false,
            singleDatePicker: true,
            showDropdowns: true,
            format: 'YYYY-MM-DD'
        });
        $('#end').daterangepicker({
            timePicker: false,
            singleDatePicker: true,
            showDropdowns: true,
            format: 'YYYY-MM-DD'
        });
    </script>
@endsection
