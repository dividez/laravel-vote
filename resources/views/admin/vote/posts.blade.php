@extends('admin.layouts.master')
@section('title')
    <title>我的投票</title>
@endsection
@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="widget widget-default">
                <div class="widget-header">
                    <h6><i class="fa fa-sticky-note fa-fw"></i>文章</h6>
                </div>
                <div class="widget-body">
                    <table class="table table-hover table-bordered table-responsive">
                        <thead>
                        <tr>
                            <th>标题</th>
                            <th>描述</th>
                            <th>状态</th>
                            <th>action</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($data as $val)
                            <tr class="">
                                <td>{{ $val->title }}</td>
                                <td>{{ $val->description }}</td>
                                <td>{{ $val->status == 1 ?'已发布':'已删除' }}</td>
                                <td>
                                    <div>
                                        <a href="{{url('/vote/'.$val->guid)}}"
                                           data-toggle="tooltip" data-placement="top" title="编辑"
                                           class="btn btn-info">
                                            <i class="fa fa-pencil fa-fw"></i>
                                        </a>
                                            <a href="{{url('/show/'.$val->guid)}}"
                                               data-toggle="tooltip" data-placement="top" title="查看"
                                               class="btn btn-success">
                                                <i class="fa fa-eye fa-fw"></i>
                                            </a>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                    {{--{{ $posts->links() }}--}}
                </div>
            </div>
        </div>
    </div>
@endsection
