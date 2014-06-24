KISSY.add(function (S, Node, Anim, XTemplate, ListTpl) {
    var $ = S.all;

    function Player(container, options) {
        var self = this;
        this.el = $(container);
        this.audio = this.el.one('audio')[0];
        this.animImg = $('.rotate-img');
        this.mList = [{
            title: '传奇',
            artist: '王菲',
            album: '传奇',
            src: 'resource/music/传奇.mp3',
            img: 'resource/img/fei.jpg'
        }, {
            title: '拥抱',
            artist: '五月天',
            album: '诺亚方舟世界巡回演唱会',
            src: 'resource/music/拥抱.mp3',
            img: 'resource/img/mayday.jpg'
        }, {
            title: '愚人的国度',
            artist: '孙燕姿',
            album: '是时候',
            src: 'resource/music/愚人的国度.mp3',
            img: 'resource/img/yanzi.jpg'
        }, {
            title: '失忆蝴蝶',
            artist: '陈奕迅',
            album: 'The key',
            src: 'resource/music/失忆蝴蝶.mp3',
            img: 'resource/img/eason.jpg'
        }, {
            title: 'Outlaws Of Love',
            artist: 'Adam',
            album: 'Trespass',
            src: 'resource/music/Outlaws Of Love.mp3',
            img: 'resource/img/adam.jpg'
        }];
        this.currentPlay = 0;
        this.animStyle = {
            transform: 'rotate(360deg)'
        };
        this.animCfg = {
            duration: 15,
            easing: 'easeNone',
            complete: function () {
                self.animImg.css('transform', 'rotate(0deg)');
                self.animCD = new Anim(self.animImg, self.animStyle, self.animCfg);
                self.animCD.run();
            }
        };
        this.animCD = new Anim(this.animImg, this.animStyle, this.animCfg);
    }

    Player.prototype.init = function () {
        var self = this;
        $(this.audio).attr('src', this.mList[this.currentPlay].src);
        this.musicList();
        this.initTeyeWrap();
        this.animImg.css('background-image', 'url("' + this.mList[this.currentPlay].img + '")');
        $('.m-list .list-item:nth-child(' + (this.currentPlay + 1) + ')').addClass('playing');

        var toggleBtn = $('.toggle'),
            forwardBtn = $('.forward'),
            backwardBtn = $('.backward'),
            showListBtn = $('.show-list'),
            showTypeBtn = $('.show-type');
        var musicList = $('.music-list'),
            listShown = false,
            typeWrap = $('.type-wrap'),
            typeShown = false;
        var handler = $('.handler'),
            handPos = 0;

        toggleBtn.on('click', function () {
            if (self.audio.paused) {
                self.audio.play();
                self.animCD.isPaused() ? self.animCD.resume() : self.animCD.run();
                $(this).css('background-position', '5px -25px');
            } else {
                self.audio.pause();
                self.animCD.pause();
                $(this).css('background-position', '8px 5px');
            };
        });

        forwardBtn.on('click', function () {
            self.audio.currentTime += 5;
        });

        backwardBtn.on('click', function () {
            self.audio.currentTime -= 5;
        });

        showListBtn.on('click', function () {
            if (listShown) {
                musicList.css('transform', 'translate3d(-300px,0,0)');
                $(this).css({
                    width: '40px',
                    border: 'none'
                }).html('&gt');
                listShown = false;
            } else {
                musicList.css('transform', 'translate3d(300px,0,0)');
                $(this).css({
                    width: '200px',
                    border: '1px solid'
                }).html('&lt 正在播放');
                listShown = true;
            };
        });

        showTypeBtn.on('click', function () {
            if (typeShown) {
                typeWrap.css('transform', 'translate3d(300px, 0, 0)');
                $(this).css({
                    width: '40px',
                    border: 'none'
                }).html('&lt');
                typeShown = false;
            } else {
                typeWrap.css('transform', 'translate3d(-300px, 0, 0)');
                $(this).css({
                    width: '200px',
                    border: '1px solid'
                }).html('到处看看 &gt');
                typeShown = true;
            };
        });

        $(self.audio).on('timeupdate', function () {
            handPos = this.currentTime / this.duration * 100;
            handler.css('left', handPos - 1 + '%');
            if (this.ended)
                self.playOther(self.currentPlay + 1);
        });

        $(self.audio).on('progress', function () {});

    };

    Player.prototype.musicList = function () {
        var listEl = $('.m-list');
        var list = [];
        var self = this;

        for (var i = 0; i < this.mList.length; i++) {
            list.push(new XTemplate(ListTpl).render(this.mList[i]));
        };
        var listStr = list.join('\n');
        listEl.append(listStr);

        i = 0;
        $('.m-list .list-item').each(function () {
            this[0].index = i++;
        });

        listEl.on('click', function (ev) {
            var index;
            if (ev.target.parentElement.index !== undefined) {
                index = ev.target.parentElement.index;
            } else {
                index = ev.target.index;
            }
            if (index || index === 0) {
                self.playOther(index);
                $('.toggle').css('background-position', '5px -25px');
            }

        });
    }

    Player.prototype.playOther = function (index) {
        if (index >= this.mList.length)
            index = 0;
        self = this;
        var handler = $('.handler'),
            handPos = 0;
        $('.m-list .list-item:nth-child(' + (this.currentPlay + 1) + ')').removeClass('playing');
        this.currentPlay = index;
        $('.m-list .list-item:nth-child(' + (this.currentPlay + 1) + ')').addClass('playing');
        this.audio.remove();
        this.audio = $('<audio src="' + this.mList[this.currentPlay].src + '"></audio>')[0];
        this.el.append(this.audio);
        $(this.audio).on('timeupdate', function () {
            handPos = this.currentTime / this.duration * 100;
            handler.css('left', handPos - 1 + '%');
            if (this.ended)
                self.playOther(self.currentPlay + 1);
        });
        $(this.audio).on('progress', function () {});
        this.audio.play();

        if (this.animCD.isPaused())
            this.animCD.resume()
        if (!this.animCD.isRunning())
            this.animCD.run();

        this.animImg.css('background-image', 'url("' + this.mList[this.currentPlay].img + '")');
    }

    Player.prototype.initTeyeWrap = function () {
        var nav = $('.type-nav'),
            navItem = nav.all('a'),
            typeSection = $('.t-section'),
            typePage = $('.t-section>li'),
            current = 1,
            isAnimating = false,
            aCount = 0;
        $(typePage[current - 1]).css('opacity', 1);
        var i = 1;
        navItem.each(function () {
            this[0].index = i++;
        });

        $(navItem[current - 1]).addClass('currentTab');

        nav.on('click', function (ev) {
            var index = ev.target.parentElement.index || ev.target.index;
            if (isAnimating || current === index)
                return;
            var navOutPre = {
                    transform: 'translateX(100%) scale(0.9)',
                    opacity: 0
                },
                navInNext = {
                    transform: 'translateX(0)'
                },
                animOutCfg = {
                    duration: 1.2,
                    easing: 'cubic-bezier(0.7, 0, 0.3, 1)',
                    complete: function () {
                        $(typePage[current - 1]).css({
                            //                            transform:'translateX(0)'
                        });
                        --aCount;
                        if (aCount === 0){
                            isAnimating = false;
                            current = index;
                        }
                    },
                    useTransiton: true
                },
                animInCfg = {
                    duration: 1.2,
                    easing: 'cubic-bezier(0.7, 0, 0.3, 1)',
                    complete: function () {
                        current = index;
                        --aCount;
                        if (aCount === 0){
                            isAnimating = false;
                            current = index;
                        }
                    },
                    useTransiton: true
                };

            if (index && !isAnimating) {
                $(navItem[current - 1]).removeClass('currentTab');
                $(navItem[index - 1]).addClass('currentTab');
                
                $(typePage[current - 1]).animate(navOutPre, animOutCfg);
                ++aCount;
                
                $(typePage[index - 1]).css({
                    transform: 'translateX(-100%)',
                    opacity: 1
                }).animate(navInNext, animInCfg);
                ++aCount;
                
                isAnimating = true;
            }
        });

    }

    return Player;
}, {
    requires: ['node', 'anim', 'xtemplate', 'player/tpl/mListItem-xtpl']
});