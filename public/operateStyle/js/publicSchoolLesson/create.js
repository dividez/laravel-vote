/*--------------------------------------------------------------------------------
create.js 公立校排课
--------------------------------------------------------------------------------*/


$(function(){
  // 当天零点时间戳
  window.currentTime = date;
  var scheduleTimer = null;
  var schedulingTimer = null;
  var lesson_guid = null;

  // 同步服务器时间
  setInterval(function(){
    serverTime++;
  }, 1000);

  // 生成排课表
  $('.schedule').html(createSchedule());

  // 获取公立校排课情况
  getSchedule(date);

  // 时时监控过期情况
  clearInterval(scheduleTimer);
  scheduleTimer = setInterval(function(){
    $('.schedule dl:not(".first") dd').each(function(index, elem){
      if((parseInt($(elem).data('time'))+(parseInt($(elem).data('hour'))+1)*3600) < (parseInt(serverTime)+1800)){
        $(elem).addClass('overdue').removeClass('public-booked');
      }
    });
  }, 1000);

  // 排课
  $('.schedule').on('click', 'dl:not(".first") dd', function(){
    // 还需要判断进度(先不做)

    if(!$(this).hasClass('overdue')){
      var ddObj = this;
      var time = parseInt($(this).data('time'));
      var hour = parseInt($(this).data('hour'));
      var minutes = 0;
      var html = '';

      $('.shade').show().css({
        width: $(window).width(),
        height: $(window).height() + $(window).scrollTop()
      });

      $('.scheduling').show().css({
        left: ($('.box-body .inner').width() - $('.scheduling').width())/2,
        top: 30+$(window).scrollTop()
      });

      // 生成上课时间列表
      for(var i=0; i<12; i++){
        var class_time_stamp = time + hour*3600 + minutes*60;
        if(i%4 == 0){
          html += '<li data-time="'+time+'" data-class_time="'+class_time_stamp+'" class="first '+((class_time_stamp < (parseInt(serverTime) + 1800)) ? 'overdue' : '')+'">'+(hour < 10 ? '0'+hour : hour)+':'+(minutes < 10 ? '0'+minutes : minutes)+'</li>';
        }else if((i+1)%4 == 0){
          html += '<li data-time="'+time+'" data-class_time="'+class_time_stamp+'" class="end '+((class_time_stamp < (parseInt(serverTime) + 1800)) ? 'overdue' : '')+'">'+(hour < 10 ? '0'+hour : hour)+':'+(minutes < 10 ? '0'+minutes : minutes)+'</li>';
        }else{
          html += '<li data-time="'+time+'" data-class_time="'+class_time_stamp+'" class="'+((class_time_stamp < (parseInt(serverTime) + 1800)) ? 'overdue' : '')+'">'+(hour < 10 ? '0'+hour : hour)+':'+(minutes < 10 ? '0'+minutes : minutes)+'</li>';
        }
        minutes += 5;
      }

      $('.scheduling .schedule-time .nav').html(html);

      // 时时监控过期情况
      clearInterval(schedulingTimer);
      schedulingTimer = setInterval(function(){
        $('.schedule-time .nav li').each(function(index, elem){
          if(parseInt($(elem).data('class_time')) < (parseInt(serverTime)+1800)){
            $(elem).addClass('overdue');
          }
        });
      }, 1000);

      // 获取套餐
      schedulingShade();
      $.ajax({
        type: 'post',
        url: '/public_school_lesson/get_public_school_package',
        data: {'student_guid': student_guid},
        dataType: 'json',
        success: function(res, status){
          if(status == 'success'){
            if(res.ServerNo == 'SN000'){
              var data = res.ResultData;
              var html = '';
              html += '<option value="-1">请选择</option>';
              for(var i=0; i<data.length; i++){
                html += '<option value="'+data[i].textbook_id+':'+data[i].public_length+':'+data[i].lesson_guid+'">'+data[i].name+'</option>';
              }
              $('#exampleInputPackage').html(html);
            }else{
              resetSelect($('#exampleInputPackage'));
            }
          }
          $('.scheduling .scheduling-shade').hide();
          $('.scheduling .loading').hide();
        },
        async: true
      });

      // 选择套餐
      $('#exampleInputPackage').on('change', function(){
        var temp = $(this).val();

        if(temp != -1){
          var arr = temp.split(':');
          var material_id = arr[0];
          var whenlong = arr[1];
          lesson_guid = arr[2];

          // 设置时长
          $('#exampleInputWhenlong').val(whenlong);

          schedulingShade();
          $.ajax({
            type: 'post',
            url: '/public_school_lesson/get_material',
            data: {'material_id':material_id},
            dataType: 'json',
            success: function(res, status){
              if(status == 'success'){
                if(res.ServerNo == 'SN000'){
                  var data = res.ResultData;
                  var html = '';
                  html += '<option value="-1">请选择</option>';
                  html += '<option value="'+data.id+':'+data.course_id+'">'+data.name+'</option>';
                  $('#exampleInputMaterial').empty();
                  $('#exampleInputMaterial').html(html);

                  resetSelect($('#exampleInputBook'));
                  resetSelect($('#exampleInputSection'));
                  resetSelect($('#exampleInputTeacher'));

                  $('.scheduling .box-footer strong').text('');
                  $('.schedule-time li').removeClass('public-booked');
                }else{
                  resetSelect($('#exampleInputMaterial'));
                  $('.scheduling .box-footer strong').text('');
                  $('.schedule-time li').removeClass('public-booked');
                }
              }

              $('.scheduling .scheduling-shade').hide();
              $('.scheduling .loading').hide();
            },
            async: true
          });
        }else{
          resetSelect($('#exampleInputMaterial'));
          resetSelect($('#exampleInputBook'));
          resetSelect($('#exampleInputSection'));
          $('#exampleInputWhenlong').val('');
          resetSelect($('#exampleInputTeacher'));
          $('.scheduling .box-footer strong').text('');
          $('.schedule-time li').removeClass('public-booked');
        }
      });

      // 选择教材
      $('#exampleInputMaterial').on('change', function(){
        var temp = $(this).val();

        if(temp != -1){
          var arr = temp.split(':');
          var material_id = arr[0];
          var course_id = arr[1];

          //获取教材下的课本
          schedulingShade();
          $.ajax({
            type: 'post',
            url: '/public_school_lesson/get_book',
            data: {'material_id': material_id},
            dataType: 'json',
            success: function(res, status){
              if(status == 'success'){
                if(res.ServerNo == 'SN000'){
                  var data = res.ResultData;
                  var html = '';
                  html += '<option value="-1">请选择</option>';
                  for(var i=0; i<data.length; i++){
                    html += '<option value="'+data[i].id+'">'+data[i].name+'</option>';
                  }
                  $('#exampleInputBook').empty();
                  $('#exampleInputBook').html(html);
                  $('.scheduling .box-footer strong').text('');
                  $('.schedule-time li').removeClass('public-booked');
                }else{
                  resetSelect($('#exampleInputBook'));
                  $('.scheduling .box-footer strong').text('');
                  $('.schedule-time li').removeClass('public-booked');
                }
              }
              $('.scheduling .scheduling-shade').hide();
              $('.scheduling .loading').hide();
            },
            async: true
          });

          //获取可以教这个教材的老师
          $.ajax({
            type: 'post',
            url: '/public_school_lesson/get_teacher',
            data: {'course_id':course_id},
            dataType: 'json',
            success: function(res, status){
              if(status == 'success'){
                if(res.ServerNo == 'SN000'){
                  var data = res.ResultData;
                  var html = '';
                  html += '<option value="-1">请选择</option>';
                  for(var i=0; i<data.length; i++){
                    html += '<option value="'+data[i].guid+'">'+data[i].firstname+data[i].lastname+'</option>';
                  }
                  $('#exampleInputTeacher').empty();
                  $('#exampleInputTeacher').html(html);
                }else{
                  resetSelect($('#exampleInputTeacher'));
                }
              }
            },
            async: true
          });
        }else{
          resetSelect($('#exampleInputBook'));
          resetSelect($('#exampleInputSection'));
          resetSelect($('#exampleInputTeacher'));
          $('.scheduling .box-footer strong').text('');
          $('.schedule-time li').removeClass('public-booked');
        }
      });

      // 选择课本
      $('#exampleInputBook').on('change', function(){
        var book_id = $(this).val();
        if(book_id != -1){
          schedulingShade();
          $.ajax({
            type: 'post',
            url: '/public_school_lesson/get_section',
            data: {'book_id': book_id},
            dataType: 'json',
            success: function(res, status){
              if(status == 'success'){
                if(res.ServerNo == 'SN000'){
                  var data = res.ResultData;
                  var html = '';
                  html += '<option value="-1">请选择</option>';
                  for(var i=0; i<data.length; i++){
                    html += '<option value="'+data[i].number+'">'+data[i].title+'</option>';
                  }
                  $('#exampleInputSection').empty();
                  $('#exampleInputSection').html(html);
                  $('.scheduling .box-footer strong').text('');
                  $('.schedule-time li').removeClass('public-booked');
                }else{
                  resetSelect($('#exampleInputSection'));
                  $('.scheduling .box-footer strong').text('');
                  $('.schedule-time li').removeClass('public-booked');
                }
              }
              $('.scheduling .scheduling-shade').hide();
              $('.scheduling .loading').hide();
            },
            async: true
          });
        }else{
          resetSelect($('#exampleInputSection'));
          $('.scheduling .box-footer strong').text('');
          $('.schedule-time li').removeClass('public-booked');
        }
      });

      // 选择课节
      $('#exampleInputSection').on('change', function(){
        var section = $(this).val();
        $('.scheduling .box-footer strong').removeClass('sectionConfirm');
        $('.scheduling .box-footer strong').text('');

        if(section != -1){
          var fm = $('form')[0];
          var fd = new FormData(fm);
          var student_guid = fd.get('student_guid');
          var teacher_guid = fd.get('teacher_guid');

          if(student_guid != -1 && teacher_guid != -1 && lesson_guid != null && section != -1){
            var obj = {
              student_guid: student_guid,
              teacher_guid: teacher_guid,
              lesson_guid: lesson_guid,
              evolve: section
            };

            schedulingShade();

            // 检测选中课节是否已经上过
            $.ajax({
              type: 'post',
              url: '/public_school_lesson/check_section',
              data: obj,
              dataType: 'json',
              success: function(res, status){
                if(status == 'success'){
                  if(res.ServerNo == 'SN000'){
                    $('.scheduling .form-section span').show();
                  }else{
                    $('.scheduling .form-section span').hide();
                  }
                }
                $('.scheduling .scheduling-shade').hide();
                $('.scheduling .loading').hide();
              },
              async: true
            });
          }
        }else{
          $('.scheduling .form-section span').hide();
        }
      });

      // 选择外教
      $('#exampleInputTeacher').on('change', function(){
        var teacher_guid = $(this).val();
        if(teacher_guid != -1){
          var whenlong = $('#exampleInputWhenlong').val();
          var class_time = $('.schedule-time .nav li:not(".overdue")').eq(0).data('class_time');
          $('.schedule-time li').removeClass('public-booked');

          schedulingShade();

          $.ajax({
            type: 'post',
            url: '/public_school_lesson/select_teacher',
            data: {
              time: time,
              hour: hour,
              teacher_guid: teacher_guid,
              whenlong: whenlong,
              class_time: class_time
            },
            dataType: 'json',
            success: function(res, status){
              if(status == 'success'){
                if(res.ServerNo == 'SN000'){
                  var data = res.ResultData;
                  // 判断正常排课情况
                  if(data['res'].length != 0){
                    // 获取一个小时内教师的正常课程约课情况
                    if(data['res'].length == 2){    // 两节的情况
                      $('.schedule-time li').addClass('booked');
                    }else{                          // 一节的情况
                      var class_time_stamp = data['res'][0].class_time_stamp;
                      $('.scheduling li').each(function(index, elem){
                        if($(elem).data('class_time') == class_time_stamp){
                          if(index == 0){
                            $('.schedule-time li:lt(6)').addClass('booked');
                          }else{
                            $('.schedule-time li:gt(5)').addClass('booked');
                          }
                        }
                      });
                    }
                  }

                  $('.scheduling .box-footer strong').text('');
                  $('.schedule-time li').removeClass('public-booked');

                  // 判断公立校排课情况
                  if(data['bespeak'].length != 0){
                    var bespeak = data['bespeak'];
                    var startTime = parseInt($('.schedule-time .nav li').eq(0).data('class_time'));
                    var endTime = parseInt($('.schedule-time .nav li').eq($('.schedule-time .nav li').size() - 1).data('class_time'));

                    for(var i in bespeak){
                      var startIndex = 0;
                      var endIndex = 0;
                      if(bespeak[i].class_time_stamp < startTime && bespeak[i].end_time_stamp > endTime){
                        $('.schedule-time .nav li').addClass('public-booked');
                      }else if(bespeak[i].class_time_stamp < startTime && bespeak[i].end_time_stamp <= endTime){
                        var index = 0;
                        $('.schedule-time .nav li').each(function(key, elem){
                          if(parseInt($(elem).data('class_time')) == bespeak[i].end_time_stamp){
                            index = key;
                          }
                        });
                        $('.schedule-time .nav li').slice(0, index+1).addClass('public-booked');
                      }else if(bespeak[i].class_time_stamp >= startTime && bespeak[i].end_time_stamp > endTime){
                        var index = 0;
                        $('.schedule-time .nav li').each(function(key, elem){
                          if(parseInt($(elem).data('class_time')) == bespeak[i].class_time_stamp){
                            index = key;
                          }
                        });
                        $('.schedule-time .nav li').slice(index, $('.schedule-time .nav li').size()).addClass('public-booked');
                      }else{
                        var startIndex = 0;
                        var endIndex = 0;
                        $('.schedule-time .nav li').each(function(index, elem){
                          if(parseInt($(elem).data('class_time')) == bespeak[i].class_time_stamp){
                            startIndex = index;
                          }
                          if(parseInt($(elem).data('class_time')) == bespeak[i].end_time_stamp){
                            endIndex = index;
                          }
                        });
                        $('.schedule-time .nav li').slice(startIndex, endIndex+1).addClass('public-booked');
                      }
                    }
                  }
                }else{
                  $('.schedule-time li').removeClass('booked');
                  $('.schedule-time li').removeClass('public-booked');
                  $('.scheduling .box-footer strong').text('');
                }
              }
              $('.scheduling .scheduling-shade').hide();
              $('.scheduling .loading').hide();
            },
            async: true
          });
        }else{
          $('.schedule-time li').removeClass('booked');
          $('.schedule-time li').removeClass('public-booked');
          $('.scheduling .box-footer strong').text('');
        }
      });
      
      // 选择上课时间
      $('.schedule-time .nav li').on('click', function(){
        if(!$(this).hasClass('overdue') && !$(this).hasClass('booked') && !$(this).hasClass('public-booked')){
          $('.scheduling .box-footer strong').removeClass('sectionConfirm');
          $('.scheduling .box-footer strong').text('');
          if($(this).hasClass('seled')){
            $(this).removeClass('seled');
          }else{
            $(this).addClass('seled');
            $(this).siblings().removeClass('seled');
          }
        }
      });

      // 排课操作
      $('.scheduling .confirm').on('click', function(){
        $('.scheduling .form-section span').hide();
        $('.scheduling .box-footer strong').text('');

        // 数据合法性验证
        if($('#exampleInputPackage').val() == -1){
          $('.scheduling .box-footer strong').text('未选择套餐');
          return false;
        }
        if($('#exampleInputMaterial').val() == -1){
          $('.scheduling .box-footer strong').text('未选择教材');
          return false;
        }
        if($('#exampleInputBook').val() == -1){
          $('.scheduling .box-footer strong').text('未选择课本');
          return false;
        }
        if($('#exampleInputSection').val() == -1){
          $('.scheduling .box-footer strong').text('未选择课节');
          return false;
        }
        if($('#exampleInputTeacher').val() == -1){
          $('.scheduling .box-footer strong').text('未选择外教');
          return false;
        }
        var seled = $('.schedule-time .nav .seled');
        if(seled.length != 0){
          var fm = $('form')[0];
          var fd = new FormData(fm);
          var whenlong = parseInt($('#exampleInputWhenlong').val());
          var class_time_stamp = seled.data('class_time');
          var end_time_stamp = parseInt(seled.data('class_time'))+parseInt($('#exampleInputWhenlong').val())*60;
          var student_guid = fd.get('student_guid');
          var teacher_guid = fd.get('teacher_guid');
          var section = fd.get('evolve');

          // 检测选中课节是否已经上过
          schedulingShade();
          var obj = {
            student_guid: student_guid,
            teacher_guid: teacher_guid,
            lesson_guid: lesson_guid,
            evolve: section
          };
          
          $.ajax({
            type: 'post',
            url: '/public_school_lesson/check_section',
            data: obj,
            dataType: 'json',
            success: function(res, status){
              if(status == 'success'){
                if(res.ServerNo == 'SN000'){
                  // 如果课节已经上过， 则给出提示
                  if(!$('.scheduling .box-footer strong').hasClass('sectionConfirm')){
                    $('.scheduling .scheduling-shade').hide();
                    $('.scheduling .loading').hide();
                    $('.scheduling .box-footer strong').addClass('sectionConfirm').text('你选择的课节已经上过，确认要重复上课吗？');
                  // 课节已经上过，但还是要确认排课
                  }else{
                    schedule({
                      fd: fd,
                      teacher_guid: teacher_guid,
                      student_guid: student_guid,
                      class_time_stamp: class_time_stamp,
                      end_time_stamp: end_time_stamp,
                      lesson_guid: lesson_guid,
                      hour: hour,
                      seled: seled,
                      whenlong: whenlong,
                      ddObj: ddObj,
                      time: time,
                      currentTime: currentTime
                    });
                  }
                }else{
                  // 正常情况
                  schedule({
                    fd: fd,
                    teacher_guid: teacher_guid,
                    student_guid: student_guid,
                    class_time_stamp: class_time_stamp,
                    end_time_stamp: end_time_stamp,
                    lesson_guid: lesson_guid,
                    hour: hour,
                    seled: seled,
                    whenlong: whenlong,
                    ddObj: ddObj,
                    time: time,
                    currentTime: currentTime
                  });
                }
              }
            },
            async: true
          });
        }else{
          $('.scheduling .box-footer strong').text('未选择上课时间');
        }
      });
    }
  });
  
  $(window).on('resize', function(){
    if($('.scheduling').css('display') == 'block'){
      $('.shade').show().css({
        width: $(window).width(),
        height: $(window).height() + $(window).scrollTop()
      });
    }
  }).on('scroll', function(){
    if($('.scheduling').css('display') == 'block'){
      $('.shade').show().css({
        width: $(window).width(),
        height: $(window).height() + $(window).scrollTop()
      });
    }
    $('.scheduling').css({
      top: 30 + $(window).scrollTop()
    });
  });

  //关闭课程设置框
  $('.scheduling .closeSchedule').on('click', function(){
    resetSelect($('#exampleInputPackage'));
    resetSelect($('#exampleInputMaterial'));
    resetSelect($('#exampleInputBook'));
    resetSelect($('#exampleInputSection'));
    resetSelect($('#exampleInputTeacher'));
    $('#exampleInputPackage').off('change');
    $('#exampleInputMaterial').off('change');
    $('#exampleInputBook').off('change');
    $('#exampleInputWhenlong').val('');
    $('#exampleInputTeacher').off('change');
    $('.scheduling .confirm').off('click');
    $('.shade').hide();
    $('.scheduling').hide();
  });

  // 上一周
  $('.lesson .prevWeek').on('click', function(){
    date = parseInt(date)-7*86400;
    $('.schedule').empty();
    $('.schedule').html(createSchedule(date));

    // 获取公立校排课情况
    getSchedule(date);
  });

  // 今天
  $('.lesson .today').on('click', function(){
    date = window.currentTime;
    $('.schedule').empty();
    $('.schedule').html(createSchedule(date));

    // 获取公立校排课情况
    getSchedule(date);

    // 获取课程列表
    getScheduleList({'time': window.currentTime, 'student_guid': student_guid});
  });

  // 下一周
  $('.lesson .nextWeek').on('click', function(){
    date = parseInt(date)+7*86400;
    $('.schedule').empty();
    $('.schedule').html(createSchedule(date));

    // 获取公立校排课情况
    getSchedule(date);
  });

  $('.schedule').on('mouseenter', 'dl:not(".first") dt', function(){
    $(this).addClass('hover');
  }).on('mouseleave', 'dl:not(".first") dt', function(){
    $(this).removeClass('hover');
  });

  // 点击获取课程列表
  $('.schedule').on('click', 'dl:not(".first") dt', function(){
    $('.schedule dl:not(".first") dt').removeClass('selected hover');
    $(this).addClass('selected');

    getScheduleList({'time': $(this).data('time'), 'student_guid': student_guid});
  });

  // 获取课程列表
  getScheduleList({'time': window.currentTime, 'student_guid': student_guid});
});

// 排课操作
function schedule(obj){
  // 检测排课操作是否合法
  $.ajax({
    type: 'post',
    url: '/public_school_lesson/check_schedule',
    data: {
      student_guid: obj.student_guid,
      teacher_guid: obj.teacher_guid,
      class_time_stamp: obj.class_time_stamp,
      end_time_stamp: obj.end_time_stamp
    },
    dataType: 'json',
    success: function(res, status){
      if(status == 'success'){
        if(res.ServerNo == 'SN000'){
          $('.scheduling .box-footer strong').text('已有排课');
          $('.scheduling .scheduling-shade').hide();
          $('.scheduling .loading').hide();
        }else{
          // 满足排课条件才能进行排课操作
          obj.fd.append('lesson_guid', obj.lesson_guid);
          obj.fd.append('hour', obj.hour);
          obj.fd.append('class_time_stamp', obj.class_time_stamp);
          obj.fd.append('end_time_stamp', obj.end_time_stamp);

          $.ajax({
            type: 'post',
            url: '/public_school_lesson',
            data: obj.fd,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function(res, status){
              if(status == 'success'){
                // 操作成功
                if(res.ServerNo == 'SN000'){
                  var html = '';
                  var index = obj.seled.index();
                  var endIndex = obj.whenlong/5;
                  var section = 0;

                  $('.schedule-time .nav li').slice(index, endIndex+index+1).removeClass('seled').addClass('public-booked');
                  section = parseInt($(obj.ddObj).find('strong').text());
                  if(isNaN(section)) section = 0;
                  $(obj.ddObj).addClass('public-booked').html('已约<strong>'+(section+1)+'</strong>节');

                  if(obj.time == obj.currentTime){
                    html += '<tr>';
                    html += '<td>'+timeConvert(obj.seled.data('class_time'))+'</td>';
                    html += '<td>'+$('#exampleInputTeacher').find("option:selected").text()+'</td>';
                    html += '<td>'+$('#exampleInputMaterial').find("option:selected").text()+'</td>';
                    html += '<td>'+$('#exampleInputSection').find("option:selected").text()+'</td>';
                    html += '<td>'+$('#exampleInputSection').val()+'</td>';
                    html += '<td>'+$('#exampleInputWhenlong').val()+'</td>';
                    html += '<td>状态</td>';
                    html += '<td>操作</td>';
                    html += '</tr>';
                  }

                  $('.schedule-list table tr:eq(0)').after(html);
                }
              }
              $('.scheduling .scheduling-shade').hide();
              $('.scheduling .loading').hide();
            },
            async: true
          });
        }
      }
    },
    async: true
  });
}

// 获取课程列表
function getScheduleList(obj){
  $.ajax({
    type: 'post',
    url: '/public_school_lesson/get_schedule_list',
    data: obj,
    dataType: 'json',
    success: function(res, status){
      if(status == 'success'){
        if(res.ServerNo == 'SN000'){
          var data = res.ResultData;
          var html = '';

          for(var i in data){
            html += '<tr>';
            html += '<td>'+timeConvert(data[i].class_time_stamp)+'</td>';
            html += '<td>'+data[i].teacherName+'</td>';
            html += '<td>'+data[i].materialName+'</td>';
            html += '<td>'+data[i].sectionName+'</td>';
            html += '<td>'+data[i].evolve+'</td>';
            html += '<td>'+data[i].whenlong+'</td>';
            html += '<td>状态</td>';
            html += '<td>操作</td>';
            html += '</tr>';
          }
          $('.schedule-list table tr:gt(0)').detach();
          $('.schedule-list table tr:eq(0)').after(html);
        }else{
          html += '<tr>';
          html += '<td colspan="'+8+'">暂无数据</td>';
          html += '</tr>';

          $('.schedule-list table tr:gt(0)').detach();
          $('.schedule-list table tr:eq(0)').after(html);
        }
      }
    },
    async: true
  });
}

// 获取公立校排课情况
function getSchedule(param){
  var week = getWeekTimes(param);

  // 获取公立校排课情况
  $.ajax({
    type: 'post',
    url: '/public_school_lesson/get_schedule',
    data: {'week': week, 'student_guid': student_guid},
    dataType: 'json',
    success: function(res, status){
      if(status == 'success'){
        if(res.ServerNo == 'SN000'){
          var data = res.ResultData;
          for(var i in data){
            if(data[i].length != 0){
              for(var j in data[i]){
                $('.schedule dl dd[data-time="'+data[i][j].time+'"][  data-hour="'+data[i][j].hour+'"]').addClass('public-booked').html('已约<strong>'+data[i][j].total+'</strong>节');
              }
            }
          }
        }
      }
    },
    async: true
  });
}

// 显示遮罩层
function schedulingShade(){
  var sWidth = $('.scheduling').width();
  var sHeight = $('.scheduling').height();

  $('.scheduling .scheduling-shade').show().css({
    width: sWidth,
    height: sHeight + $('.scheduling').scrollTop()
  });

  $('.scheduling .loading').show().css({
    left: ($('.scheduling').width() - $('.scheduling .loading').width()) / 2,
    top: ($('.scheduling').height() - $('.scheduling .loading').height()) / 2 + $('.scheduling').scrollTop()
  });

  $('.scheduling').on('scroll', function(){
    $('.scheduling .scheduling-shade').css({
      height: sHeight + $('.scheduling').scrollTop()
    });

    $('.scheduling .loading').css('top', ($('.scheduling').height() - $('.scheduling .loading').height()) / 2 + $('.scheduling').scrollTop());
  });
}

// 生成排课表
function createSchedule(param){
  var html = '';
  var dates = param != undefined ? param : date;
  var Today = new Date(parseInt(dates)*1000);
  var timeQ = ['08：00~08：55', '09：00~09：55', '10：00~10：55', '11：00~11：55', '12：00~12：55', '13：00~13：55', '14：00~14：55', '15：00~15：55', '16：00~16：55', '17：00~17：55'];

  html += '<dl class="first">';
  html += '<dt>具体日期</dt>';
  html += '<dd>08：00~08：55</dd>';
  html += '<dd>09：00~09：55</dd>';
  html += '<dd>10：00~10：55</dd>';
  html += '<dd>11：00~11：55</dd>';
  html += '<dd>12：00~12：55</dd>';
  html += '<dd>13：00~13：55</dd>';
  html += '<dd>14：00~14：55</dd>';
  html += '<dd>15：00~15：55</dd>';
  html += '<dd>16：00~16：55</dd>';
  html += '<dd>17：00~17：55</dd>';
  html += '</dl>';

  // 获取一周时间戳
  var weekTimes = getWeekTimes(param);

  for(var i=1; i<=weekTimes.length; i++){
    var time = new Date(parseInt(weekTimes[i-1])*1000);
    var weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var startHour = 8;

    if(i==7){
      html += '<dl class="end">';
    }else{
      html += '<dl>';
    }

    if(currentTime == weekTimes[i-1]){
      html += '<dt data-time="'+weekTimes[i-1]+'" class="selected">';
    }else{
      html += '<dt data-time="'+weekTimes[i-1]+'">';
    }

    html += '<span>'+weeks[time.getDay()]+'</span>';
    html += '<br />';
    html += '<span>'+time.getFullYear()+'-'+(time.getMonth()+1)+'-'+((time.getDate() < 10) ? '0'+time.getDate() : time.getDate())+'</span>';
    html += '</dt>';

    for(var j=0; j<timeQ.length; j++){
      // 已过期
      if((weekTimes[i-1]+(startHour+1)*3600) < (parseInt(serverTime)+1800)){
        html += '<dd class="overdue" data-time="'+weekTimes[i-1]+'" data-hour="'+startHour+'"></dd>';
      // 未过期
      }else{
        html += '<dd data-time="'+weekTimes[i-1]+'" data-hour="'+startHour+'"></dd>';
      }
      startHour++;
    }

    html += '</dl>';
  }

  return html;
}

// 获取一周时间戳
function getWeekTimes(param){
  var weekTimes = {};
  var time = param != undefined ? param : date;

  $.ajax({
    type: 'post',
    url: '/public_school_lesson/get_week_times',
    data: {date: time},
    dateType: 'json',
    success: function(res, status){
      if(status == 'success'){
        if(res.ServerNo == 'SN000'){
          weekTimes = res.ResultData;
        }
      }
    },
    async: false
  });

  return weekTimes;
}

// 重置下拉列表
function resetSelect(obj){
  var html = '';
  html += '<option value="-1">请选择</option>';
  html += '<option>暂无数据</option>';
  obj.empty();
  obj.html(html);
}