@extends('admin.layouts.app')
@section('title')
    <title>投票</title>
@endsection
@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                @if(empty($datas))
                    <h3 class="meta-item center-block">No posts</h3>
                @else
                    @foreach($datas as $val)
                    <article class="post">
                        <!-- post header -->
                        <div class="post-header">
                            <h1 class="post-title">
                                <a title="{{ $val->title }}" href="/show/{{ $val->guid }}">{{ $val->title }}</a>
                            </h1>
                            <div class="post-meta">
                           <span class="post-time">
                           <i class="fa fa-calendar-o"></i>
                           <time datetime="2016-08-05T00:10:14+08:00">
                           {{ date('Y-m-d',$val->addtime)}}
                           </time>
                        <!-- post content -->
                        <div class="post-description">
                            <p class="markdown-target" data-markdown="{{ $val->description }}">
                            </p>
                        </div>
                        <!-- read more -->
                        <div class="post-permalink">
                            <a title="阅读" href="/show/{{ $val->guid }}" class="btn btn-more">阅读</a>
                        </div>
                           </span></div></div>
                    </article>
                    @endforeach
                @endif
            </div>
        </div>
    </div>
@endsection
