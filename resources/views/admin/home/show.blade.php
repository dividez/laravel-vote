@extends('admin.layouts.app')
@section('title')
    <title>投票</title>
@endsection
@section('styles')
    <style>
        .opradio {
            float: left;
            margin-top: 7px;
            margin-right: 10px;
        }
        .optextinfo {
            line-height: 25px;
            margin-top: 5px;
            font-size: 18px;
        }
        .opbar {
            float: left;
            height: 20px;
        }
        .opoutbar {
            float: left;
            width: 85%;
            background-color: #F7F7F7;
            margin-bottom: 20px;
            margin-top: 0px;
            position: relative;
        }
        .voteinfo {
            margin-bottom: 20px;
        }
        legend {
            display: block;
            width: 100%;
            padding: 0;
            margin-bottom: 20px;
            font-size: 21px;
            line-height: 40px;
            color: #333333;
            border: 0;
            border-bottom: 1px solid #e5e5e5;
        }
        .opoutbar .opshownum {
            background-color: #FFFFFF;
            border: 1px solid #FFFFFF;
            border-radius: 17px;
            font-size: 10px;
            line-height: 15px;
            padding: 0 5px;
            position: absolute;
            right: 5px;
            top: 2px;
            color: #666;
        }
        .optext {
            width: 100%;
            margin-bottom: 2px;
            float: left;
            line-height: 30px;
            margin-top: 3px;
        }
    </style>
@endsection
@section('content')

    <div class="container">
        <div class="row">
            <div class="container" style="height: 80px;">
            </div>
            <div class="container">
                <h3>{{$dataNav->title}}</h3>
                <table cellspacing="0" cellpadding="0" class="table voteinfo" style="border:0px;">
                    <tbody><tr class="info">
                        <td>
						<span> 发布时间{{date('Y-m-d',$dataNav->addtime)}} </span>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span> 结束时间{{date('Y-m-d',$dataNav->endTime)}}</span>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span> {{$allNum}}人参与 </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div id="votecontent" class="votecontent">
                    <p>{{$dataNav->description}}</p><div></div>
                </div>
            </div>
            @include('admin.partials.errors')
            @include('admin.partials.success')
            <legend style="margin-top:20px;"></legend>
            <div class="container">
                <form action="/show" method="post">
                    {{csrf_field()}}
                    <input type="hidden" name="vote_guid" value="{{$dataNav->guid}}">
                    <table cellspacing="0" cellpadding="0" width="100%" class="votetable">
                        <tbody>
                        @if($dataNav->radio == 1)
                            @foreach($data as $key => $val)
                            <tr id="op_417" name="1136">
                                <td class="radiolabel" name="radio_417">
                                    <div class="optext">
                                        <div class="radio">
                                            <label>
                                                <input type="radio" name="option_guid[]" id="optionsRadios1" value="{{$val->guid}}"><span style="font-size: 19px;">{{$key +1 }} . {{$val->option}}</span>
                                            </label>
                                        </div>
                                    </div>
                                    <?php
                                    $randnum = rand(0, hexdec('FFFFFF'));
                                    $bgcolor = str_pad(dechex($randnum), 6, '0', STR_PAD_LEFT);
                                    ?>
                                    <div class="opoutbar" name="radio_417" style="">
                                        <div id="opbar_1" style="width: {{$val->proportion}}%;background-color:#{{$bgcolor}};" class="opbar"></div>
                                        <div class="opshownum">
                                            {{$val->number}}
                                        </div>
                                    </div>
                                    <div id="oppi_1" style="color:#336633;" class="oppi">{{$val->proportion}}%</div>
                                </td>
                            </tr>
                            @endforeach
                        @elseif($dataNav->radio == 2)
                            @foreach($data as $key => $val)
                            <tr id="op_417" name="1136">
                                <td class="radiolabel" name="radio_417">
                                    <div class="optext">
                                        <div class="radio">
                                            <label>
                                                <input type="checkbox" name="option_guid[]" id="optionsRadios1" value="{{$val->guid}}"><span style="font-size: 19px;">{{$key +1 }} . {{$val->option}}</span>
                                            </label>
                                        </div>
                                    </div>
                                    <?php
                                    $randnum = rand(0, hexdec('FFFFFF'));
                                    $bgcolor = str_pad(dechex($randnum), 6, '0', STR_PAD_LEFT);
                                    ?>
                                    <div class="opoutbar" name="radio_417" style="">
                                        <div id="opbar_1" style="width: {{$val->proportion}}%;background-color:#{{$bgcolor}};" class="opbar"></div>
                                        <div class="opshownum">
                                            {{$val->number}}
                                        </div>
                                    </div>
                                    <div id="oppi_1" style="color:#336633;" class="oppi">{{$val->proportion}}%</div>
                                </td>
                            </tr>
                            @endforeach
                        @endif
                        </tbody>
                    </table>
                    <a href="javascript:;"><button type="submit" alt="" class="btn btn-default btn-success "> &nbsp;完成 &nbsp;</button></a>
                </form>
            </div>
        </div>
    </div>
@endsection
