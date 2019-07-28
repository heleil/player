$(document).ready(function($){
    var strRight = document.getElementById('pass_id').innerHTML;
    /* do no delete
    var version_flag = document.getElementById('version_flag').innerHTML;
    if(version_flag==3){
    	document.getElementById('login_container').style.background="#ff4d5b";
    }
    Highcharts.setOptions({  
        lang:{  
            decimalPoint : ",",  
            downloadJPEG : "下载JPEG图片",  
            downloadPNG : "下载PNG图片",  
            downloadPDF : "下载PDF文档",  
            downloadSVG : "下载SVG矢量图",  
            exportButtonTitle: "导出图片",
            resetZoom : '还原',
        }  
    }); 
    */
    //综合页面
		    var options1 = {
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false,
		            backgroundColor: 'rgba(0,0,0,0)',
		            margin: [0, 0, 0, 0]
		        },

		        colors:[
                        '#67D1FF',
                        '#29B7FF',
                        '#48CE5C',
                        '#FFC600',
                        '#FF9600',
                        '#F26F41'
                      ],
		        title: {
		            text: ''
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
                        enabled: false
                    	},               	                
		            }
		        },
		        series: [{
		            type: 'pie',
		            name: '次数',
		            data: [		             
		                ['低血压',  5],
		                {
		                    name: '理想',
		                    y: 15,
		                    sliced: true,
		                    selected: true
		                },
		                ['正常高',  0],
		                ['轻度',    5],
		                ['中度',    0],
		                ['重度',    0]
		            ]
		        }]
		    }
    $.ajax({
        type:'post',//选get
        url:'./bmessage.htm?id='+strRight+'&type=2', 
        dataType:'text',//服务器返回数据类型 选XML ,Json jsonp script html text等
        success:function(data){
            var obj = eval( "(" + data + ")" );
		    var a = [parseInt(obj.d1),parseInt(obj.d2),parseInt(obj.d3),parseInt(obj.d4),parseInt(obj.d5),parseInt(obj.d6)];
		    var a1 = [['低血压',parseInt(obj.d1)],['理想',parseInt(obj.d2)],['正常高',parseInt(obj.d3)],['轻度',parseInt(obj.d4)],['中度',parseInt(obj.d5)],['重度',parseInt(obj.d6)]]; 
		    var avg_level = parseInt(obj.avg_level)-1;
		    var temp1 = ["低血压","理想血压","正常偏高血压","轻度高血压","中度高血压","重度高血压"];
		    var temp2 = ["，需要注意了，请保持好的生活习惯。","，血压情况很理想，请继续保持。","，血压总体还是正常，但略微偏高，不过没有什么大碍，请保持良好的生活习惯。","，需要稍加注意了，请保持好的生活习惯。","，需要注意了，请保持良好的生活习惯，必要时请就医。","，需要注意了，建议您去看医生。"];
		    var s1 ="综合您这段时间测量的血压情况，您属于\“"+temp1[avg_level]+"\”"+temp2[avg_level];
		    var sum=0,max=0,max_index=0;
	    	for(var i=0;i<6;i++){
				sum+=a[i];
				if(a[i]>max){
		    		max = a[i];
		    		max_index = i;
				}
	    	}
	   		var s2="您这段时间一共进行了"+sum+"次血压测量，大部分血压属于\“"+temp1[max_index]+"\”。"
	    	var s2 = "<br>"+s2+"<br>"+s1;
            $('#blood_level').html(s2);
            options1.series[0].data=a1;
	    	$('#footer_1').highcharts(options1);
        }
    })
    function getLocalTime(nS){
		return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }     

    //血压趋势页面
	var options2 = {
	    chart: {
		type: 'spline',
		backgroundColor: 'rgba(0,0,0,0)'				           
	    },
	    colors:['#00B0F0','#92D050'],
	    title: {
		text: '血压趋势'
	    },
            xAxis: {
            	type: 'datetime',
            	dateTimeLabelFormats: {
                    second: '%Y-%m-%d<br/>%H:%M:%S',  
                    minute: '%Y-%m-%d<br/>%H:%M',  
                    hour: '%Y-%m-%d<br/>%H:%M',  
                    day: '%m-%d',  
                    week: '%Y-%m-%d',  
                    month: '%Y-%m',  
                    year: '%Y'  
                }
            },
            yAxis: {
	    	//gridLineWidth: 0,
                title: {
                    text: '血压值(mmHg)'
            	},
            	min: 0, 
            },
	    tooltip: {
		formatter: function() {
                    return '<b>'+ this.series.name +':' + this.y + '</b><br/>' + Highcharts.dateFormat('%m月%d日 %H:%M', this.x);
	   	}
	    },
	    plotOptions: {
		line: {
		    dataLabels: {
		    	enabled: true
		    },
		    enableMouseTracking: false
		}
	    },
	    series: [
	        {
		    name: '高压',
		    //data: [120, 92, 110, 137, 126]
		}, 
		{
		    name: '低压',
		    //data: [75,60,80, 67,90]
		},
           	{
               	    type: 'line',
               	    name:'高压趋势',
            	},
            	{
               	    type: 'line',
                    name:'低压趋势',
            	}
	    ]
    	}
		    var options4 = {
		        chart: {
		            type: 'spline',
		            backgroundColor: 'rgba(0,0,0,0)'
		        },
		        colors:[
				    '#CC99FF'			                        
				],
		        title: {
		            text: '脉压差'
		        },		    
		        xAxis: {
		            categories: [
		                
		            ],
		            labels: {
        				enabled: false// Highcharts学习交流群294191384
    				},

		            crosshair: true
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: '脉压差 (mmHg)'
		            },
		            gridLineWidth: 0,		         
		            plotLines:[{
				        color:'#0000FF',            
				        dashStyle:'shortdashdot',
				        value:20,               
				        width:2                 
				    },{
				        color:'#FF0000',           
				        dashStyle:'shortdashdot',
				        value:60,
				        width:2
				    }]
		        },

		        plotOptions: {
		            spline: {
		                pointPadding: 0.2,
		                borderWidth: 0
		            }
		        },
		        series: [{
		            name: '脉压差',
		            data: []

		        }]
		    }
    $.ajax({
	type:'post',//选get
    url:'./bmessage.htm?id='+strRight+'&type=1', 
	dataType:'text',//服务器返回数据类型 选XML ,Json jsonp script html text等
	success:function(data){
	    var obj = eval( "(" + data + ")" );
	    //alert(obj.data['data_h']);
            options2.series[0].data=obj.data['data_h'];
            options2.series[1].data=obj.data['data_l'];
            options2.series[2].data=obj.data['trend_h'];
            options2.series[3].data=obj.data['trend_l'];
            options4.series[0].data=obj.data['data_d'];
	    $('#footer_2').highcharts(options2);
   	    $('#highest1').html("<h4>"+obj.data['high_max']+"</h4>"+obj.data['high_max_time'].substr(5,11));
	    $('#highest2').html("<h4>"+obj.data['low_max']+"</h4>"+obj.data['low_max_time'].substr(5,11));
	    $('#lowest1').html("<h4>"+obj.data['high_min']+"</h4>"+obj.data['high_min_time'].substr(5,11));
	    $('#lowest2').html("<h4>"+obj.data['low_min']+"</h4>"+obj.data['low_min_time'].substr(5,11));
	    //脉压差
	    $('#footer_4').highcharts(options4);
	    /* do not delete
            if(obj.data['level']=='理想'){
            	$('#unfine').css('display','none');
              	$('#suggest').html("您的血压状况良好，请继续保持！");
             	$('#pos').css('margin-left','18%');
            }
	    */
	}
    })

    //血压平均值
		var options3 = {
		        chart: {
		            zoomType: 'xy',
		            backgroundColor: 'rgba(0,0,0,0)'
		        },
		        colors:[
				                        '#92D050',
				                        '#00B0F0'				                        
				                      ],
		        title: {
		            text: '高压平均值'
		        },

		        xAxis: [{
		            categories: ['清晨', '上午', '中午', '下午', '晚上', '夜间'],
		            labels: {
						style: {
						fontSize:'9px' //刻度字体大小
						}
						},
		            crosshair: true
		        }],
		        yAxis: [{ // Primary yAxis
		            labels: {
		                format: '{value}',
		                style: {
		                    color: Highcharts.getOptions().colors[1]
		                }
		            },
		            min:0,
		            gridLineWidth: 0,		            
		            title: {
		                text: '高压平均值(mmHg)',
		                style: {
		                    color: Highcharts.getOptions().colors[1]
		                }
		            }
		        }, { // Secondary yAxis
		            gridLineWidth: 0,
		            title: {
		                text: '测量次数(次)',
		                style: {
		                    color: Highcharts.getOptions().colors[0]
		                }
		            },
		            labels: {
		                format: '{value}',
		                style: {
		                    color: Highcharts.getOptions().colors[0]
		                }
		            },
		            opposite: true
		        }],
		        series: [{
		            name: '测量次数',
		            type: 'column',
		            yAxis: 1,
		            data: [6, 2, 6, 2, 4, 0],
		            tooltip: {
		                valueSuffix: '次'

		            }

		        }, {
		            name: '血压平均值',
		            type: 'spline',
		            data: [128,116, 120,108, 109, 0],
		            tooltip: {
		                valueSuffix: 'mmHg'
		            }
		        }]
		    }
    $.ajax({
        type:'post',//选get
        url:'./bmessage.htm?id='+strRight+'&type=3', 
        dataType:'text',//服务器返回数据类型 选XML ,Json jsonp script html text等
        success:function(data){
            var obj = eval( "(" + data + ")" );
	    var f=0;
	    //s = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp一般来说，人的血压具有昼夜波动性，夜间睡眠时血压最低，晨起活动后迅速上升，在上午6～10点和下午4～8点各有一高峰，继之缓慢下降。为此，我们统计了您在这段时间内一天中各个时间段的血压情况，请看下面的图表。"
	    $('#average1').html("<h4>"+parseInt(obj.high_4)+"</h4>");
	    $('#average2').html("<h4>"+parseInt(obj.low_4)+"</h4>");
	    var measure_time_count=[parseInt(obj.measure_time_2),parseInt(obj.measure_time_3),parseInt(obj.measure_time_4),parseInt(obj.measure_time_5),parseInt(obj.measure_time_6),parseInt(obj.measure_time_1)];
            var high_press=[parseInt(obj.high_2),parseInt(obj.high_3),parseInt(obj.high_4),parseInt(obj.high_5),parseInt(obj.high_6),parseInt(obj.high_1)];
            //var low_press=[parseInt(obj.low_1),parseInt(obj.low_2),parseInt(obj.low_3),parseInt(obj.low_4)];
	    options3.series[0].data=measure_time_count;
	    options3.series[1].data=high_press;
    	    $('#footer_3').highcharts(options3);
            //options4.series[0].data=high_press;
            //options4.series[1].data=low_press;
            //$('#container').highcharts(options4);
	    /* do not delete
	    if(high_press[0]>150){
	    	s="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp您晨间血压过高，属于清晨高血压。清晨高血压会显著增加心血管风险，也是各种心血管事件（心脏病发作，脑卒中）等发生的重要独立危险因素，请您注意。"
                $('#blood_time_2').html(s);
	    }
	    if(high_press[2]>120){
	        s="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp您夜间血压偏高，属于夜间高血压。夜间血压偏高，往往和靶器官损害及心血管疾病有关，请注意。"
                $('#blood_time_3').html(s);
	    }
	    if(high_press[1] && high_press[2]){
	    	var dip = (1-(parseFloat)(high_press[1])/(parseFloat)(high_press[2]));
		if(dip<0)f=1;
		if(dip>=0 && dip<0.1)f=2;
		if(dip>=0.1 && dip<0.2)f=3;
		if(dip>=0.2)f=4;
	        s1 = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp根据您的白天高压和夜间高压的情况，您属于";
	        temp3 = ["反杓型血压。","非杓型血压。","杓型血压。","深杓型血压。"]; 
	        s2 = "一般人的血压都是杓型的。杓型血压是指夜间血压均值较日间血压均值降低10%-20%。人体的血压具有昼夜节律性，杓型血压是比较健康的血压。";
	        s = s1+temp3[f-1]+s2;
                $('#blood_time_4').html(s);
	    }
	    */
	    //脉压差
            var avg_high_low_distance=parseInt(obj.avg_high_low_distance);
	    var s_d="您的平均脉压差";
	    if(obj.avg_high_low_distance>=60){
	        s_d=s_d+"增大，请重视，建议到医院查明原因。"
	    }else if(obj.avg_high_low_distance<20){
	    	s_d=s_d+"减小，请重视，建议到医院查明原因。"
	    }else
	        s_d=s_d+"正常，请保持。"
	    $('#maiyacha').html("<span class='prompt'>温馨提示：</span>"+s_d);

	    /* do not delete 生活信息 
	    if(parseInt(obj.life_flag)==1){
	        var life_food_1 = parseInt(obj.life_food_1);
	        var life_food_2 = parseInt(obj.life_food_2);
	        var life_food_3 = parseInt(obj.life_food_3);
	        var life_food_4 = parseInt(obj.life_food_4);
	        var life_food_5 = parseInt(obj.life_food_5);
	        var life_sport_1 = parseInt(obj.life_sport_1);
	        var life_sport_2 = parseInt(obj.life_sport_2);
	        var life_sport_3 = parseInt(obj.life_sport_3);
	        var life_sport_4 = parseInt(obj.life_sport_4);
	        var life_smoke = parseInt(obj.life_smoke);
	        var life_wine = parseInt(obj.life_wine);
	        var life_sleep = parseInt(obj.life_sleep);
	        var life_mood = parseInt(obj.life_mood);
		s1="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp从录入的数据来看，您";
		if(life_food_2==2&&life_food_3==2)s1+="经常吃蔬菜和水果，";
		if(life_food_2==1&&life_food_3==1)s1+="很少吃蔬菜和水果，";
		if(life_food_4==3)s1+="经常吃大量的肥肉和猪油，";
		if(life_sport_1==1 && life_sport_2==1)s1+="每日的步行数太少，又不进行体育锻炼，";
		if(life_sport_1==3)s1+="步行数已达到要求，"
		if(life_sport_2>1)s1+="经常参加体育锻炼，"
		if(lfie_sport_4=3)s1+="经常做家务劳动，"
		if(life_smoke==3)s1+="吸烟太多了，"
		if(life_wine==4)s1+="喝酒太多了，而且经常喝醉，"
		if(life_smoke==1 && life_wine==1)s1+="不吸烟，不喝酒，"
		if(life_wine==2 || life_wine==3)s1+="饮酒比较适量，"
		if(life_sleep==1)s1+="早睡早起，作息情况良好，"
		if(life_sleep==2)s1+="经常熬夜，"
		if(life_sleep>2)s1+="睡眠状态很差，"
		if(life_mood==2)s1+="压力比较大，"
		if(life_mood==3)s1+="情绪比较差，"
	        lenth = s1.length;
	        if(s1[lenth-1]=="，"){
		    s1=s1.substr(0,lenth-1);
		    s1+="。";
	        }
	        if(s1[lenth-1]=="您")s1="";
	    }
	    else s1="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp您没有录入生活习惯数据。";
	    s2="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp37建议：<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp饮食上应该吃适量的粮谷类食物，多吃蔬菜，水果，少油，少盐。少吃火锅，烧烤，油炸等食物。早饭吃好，午饭吃饱，晚饭吃少。少吃零食。膳食结构上，一天的粮谷类食物的供能比应为60%左右，脂肪的供能比为25%左右。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp适量的运动可以提高身体机能，保持身体良好的状态。体育锻炼，健步走，家务劳动等都是推荐的运动方式。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp正常的作息是很有必要的。不吸烟，少喝酒是健康的生活方式。要保持良好的精神状态，压力大了，学会减压；情绪差了，学会自我调节。忙了一段时间后，就去休假吧，有张有驰，才有更好的生活。"
	    //$('#life_1').html(s1);
	    //$('#life_2').html(s2);
	    */
	}
    })
});

