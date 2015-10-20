/**
 * Created by Clint_Batte on 5/18/2015.
 */

angular.module('dellUiComponents')

    .directive('navAnchored', function($timeout) {
        return {
            restrict: 'CA',
            link: function ($scope, $element, iAttrs, controller) {

                function fixWidth() {
                    $element.css('width',$element.parent().width()+1).css('left',$element.parent().offset().left+1/2);
                }
                fixWidth();

                $(window).resize(function(){
                    fixWidth();
                });


                var sticky = new Waypoint.Sticky({
                    element: $element,
                    stuckClass: "affix",
                    wrapper: "nav-tabs-affix"
                });

                var waypointObjs = $element.find('> li > a[href^=#]'),
                waypoints=[];
                console.log(waypointObjs);

                function clearActiveTab() {
                    $element.find('> li').removeClass('active');
                }

                if (waypointObjs) {
                    $(waypointObjs).on('click',function (e) {
                        //Setting up a click listener on each tab
                        e.preventDefault();

                        var target = $($(e.currentTarget).attr("href"));

                        $('html, body').stop().animate({
                            'scrollTop': target.offset().top - 100
                        }, 900, 'swing');

                        if ($element.find('> li').hasClass('active')) {
                            clearActiveTab();
                            $(e.currentTarget).parent().addClass('active');
                        }

                    });

                    _.each(waypointObjs, function(w,index){
                        var target = $($(w).attr('href')),
                        targetWaypoint = new Waypoint.Inview({
                            element: target,
                            enter: function(direction) {


                                if(direction === 'up') {
                                    clearActiveTab();
                                    $("[href="+this.element.selector+"]").parent().addClass("active");
                                }
                            },
                            exited: function(direction) {
                                if(direction === 'down'){
                                    clearActiveTab();
                                    $("[href="+this.element.selector+"]").parent().next().addClass("active");
                                }
                            }
                        });                       
                    });

                }

            }
        };

    });




