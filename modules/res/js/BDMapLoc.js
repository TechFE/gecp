define(function(require, exports, module) {
    var myBDMap = {
        initLayout: function() {
            // 百度地图API功能
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(116.331398, 39.897445);
            map.centerAndZoom(point, 12);
            map.enableScrollWheelZoom();

            var opts = {offset: new BMap.Size(0, 50)} ;
            /*控件*/
            var top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT }); // 左上角，添加比例尺
            var top_left_navigation = new BMap.NavigationControl(opts); //左上角，添加默认缩放平移控件
            var mapType1 = new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP] });
            var mapType2 = new BMap.MapTypeControl({ anchor: BMAP_ANCHOR_TOP_LEFT });

            var overView = new BMap.OverviewMapControl();
            var overViewOpen = new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT });

            map.addControl(top_left_control);
            map.addControl(top_left_navigation);
            map.addControl(mapType1); //2D图，卫星图
            map.addControl(mapType2); //左上角，默认地图控件
            map.addControl(overView); //添加默认缩略地图控件
            map.addControl(overViewOpen); //右下角，打开
            return map;
        },
        geocoderLocName: function(map, locName) {
            // 创建地址解析器实例
            var myGeo = new BMap.Geocoder();
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(locName, function(point) {
                if (point) {
                    map.centerAndZoom(point, 16);
                    map.addOverlay(new BMap.Marker(point));
                } else {
                    alert("您选择地址没有解析到结果!");
                }
            });
        },
        

    };



    module.exports = myBDMap;

});
