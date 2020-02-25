$(function () {
    //1. 根据窗口大小替换轮播图
    $(window).on('resize',function () {
        //1. 获取窗口对象宽度
        let width = $(window).width();
        //2. 设置临界点
        let isShow = width >= 800;
        //3. 取出当前元素
        let $allItems = $('#ck-carousel .carousel-item');
        //4. 遍历items
        $allItems.each((index,item)=>{
            // console.log(item)
            // console.log($(item).height())
            //4.1 根据屏幕大小判断尺寸
            let src = isShow ? $(item).data('lg-img') : $(item).data('sm-img');
            // let imgUrl = `url("${src}")`;
            let imgUrl = 'url("' + src +'")';

            console.log(imgUrl)
            //4.2 设置背景
            $(item).css({
                backgroundImage: imgUrl
            });
            //4.3 小屏幕使用img标签
            if(!isShow){
                // console.log('aaa')
                // 小屏幕使用img标签
                let $img = "<img src='" + src + "'>";
                $(item).empty().append($img)
            }else{
                // 大屏幕使用背景图片，同时清除img标签
                $(item).empty()
            }
        })

    })
    //首先触发一次函数
    $(window).trigger('resize');


    //2. 轮播图手势拖动
    let startX = 0;
    let endX = 0;
    //jquery对象
    let $carouselInner = $("#ck-carousel .carousel-inner")
    // 转成js对象
    let carouselInner = $carouselInner[0]

    //取出carousel中的jq对象，使用bootstrap事件进行上一张下一张
    let $carousel = $("#ck-carousel")

    //给js图片对象添加事件  按下时的x位置
    carouselInner.addEventListener('touchstart',(e)=>{
        startX = e.targetTouches[0].clientX
    })

    carouselInner.addEventListener('touchend',(e)=>{
        endX = e.changedTouches[0].clientX
        console.log(endX - startX);
        if(endX - startX > 0){
            //下一张
            $carousel.carousel('next')
        }else if(endX - startX < 0){
            //上一张
            $carousel.carousel('prev')
        }

    });


    //3. 工具提示
    $("[data-toggle='tooltip']").tooltip()


    //4. 产品中心超出长度
    $(window).on('resize',()=>{
        let totalW = 0;
        let $ul = $("#myTab");
        let $allLi = $("#myTab .nav-item")
        $allLi.each((index, item)=>{
            //累计所有宽度
            totalW += $(item).width()
        })
        console.log(totalW);

        //获取ul宽度
        let parentW = $allLi.parent().width();

        if(totalW > parentW){
            $ul.css({width:totalW+'px'})
        }else{
            $ul.removeAttr('style')
        }
    }).trigger('resize')
});