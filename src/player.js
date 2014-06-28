KISSY.add(function (S, Node, Anim, XTemplate, ListTpl, TypeTpl) {
    var $ = S.all;

    function Player(container, options) {
        var self = this;
        this.el = $(container);
        this.audio = this.el.one('audio')[0];
        this.animImg = $('.rotate-img');
        this.musicData = {
            chinese: [{
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
        }, {
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
        }],
            western: [],
            jk: [],
            rank: []
        }
        this.mList = [];
        this.defaltImg = 'resource/img/default.jpg';
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
        var self = this,
            audioSrc,
            animImgSrc;
        this.musicList();
        if(this.mList.length === 0){
            audioSrc = '';
            animImgSrc = this.defaltImg;
        }else{
            $($('.p-info a')[0]).html(this.mList[this.currentPlay].title);
            $($('.p-info a')[1]).html(this.mList[this.currentPlay].artist);
            $($('.p-info a')[2]).html(this.mList[this.currentPlay].album);        
            audioSrc = this.mList[this.currentPlay].src;
            animImgSrc = this.mList[this.currentPlay].img;
        }
        $(this.audio).attr('src', audioSrc);
        this.initTeyeWrap();
        this.searchHandler();
        this.initPanel();
        this.animImg.css('background-image', 'url("' + animImgSrc + '")');
        $('.m-list .list-item:nth-child(' + (this.currentPlay + 1) + ')').addClass('playing');

        var showListBtn = $('.show-list'),
            showTypeBtn = $('.show-type');
        var musicListEl = $('.music-list'),
            listShown = false,
            typeWrap = $('.type-wrap'),
            typeShown = false;
        var handler = $('.handler'),
            handPos = 0;

        showListBtn.on('click', function () {
            if (listShown) {
                musicListEl.css('transform', 'translate3d(-300px,0,0)');
                $(this).css({
                    width: '40px',
                    border: 'none'
                }).html('&gt');
                listShown = false;
            } else {
                musicListEl.css('transform', 'translate3d(300px,0,0)');
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
//                    border: '1px solid'
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

    Player.prototype.initPanel = function () {
        var self = this,
            toggleBtn = $('.toggle'),
            otherBtn = $('.otherBtn'),
            forwardBtn = $('.forward'),
            backwardBtn = $('.backward'),
            nextBtn = $('.next'),
            preBtn = $('.pre');

        toggleBtn.on('click', function () {
            if (self.audio.paused) {
                if (self.mList.length === 0)
                    return;
                self.audio.play();
                self.animCD.isPaused() ? self.animCD.resume() : self.animCD.run();
                $(this).css('background-position', '-264px -3px');
            } else {
                self.audio.pause();
                self.animCD.pause();
                $(this).css('background-position', '-34px -44px');
            };
        });

        toggleBtn.on('mouseenter', function () {
            $(this).siblings().addClass('p-show');
        });

        otherBtn.on('mouseleave', function () {
            $(this).removeClass('p-show');
        });

        forwardBtn.on('click', function () {
            self.audio.currentTime += 5;
        });

        backwardBtn.on('click', function () {
            self.audio.currentTime -= 5;
        });

        nextBtn.on('click', function () {
            self.playOther(self.currentPlay + 1);
        });

        preBtn.on('click', function () {
            self.playOther(self.currentPlay - 1);
        });
    }

    Player.prototype.getPlaylist = function () {
        var list = [];
        list = JSON.parse(localStorage.getItem('playlist'));
        return list || [];
    }
    
    Player.prototype.musicList = function () {
        this.mList = this.getPlaylist();
        var listEl = $('.m-list'),
            list = [],
            self = this;
        for (var i = 0; i < this.mList.length; i++) {
            list.push(new XTemplate(ListTpl).render(this.mList[i]));
        };
        var listStr = list.join('\n');
        listEl.append(listStr);

        listEl.delegate('click', '.m-list .list-item', function (ev) {
            self.playOther($(ev.currentTarget).index());
            $('.toggle').css('background-position', '-264px -3px');
            ev.halt();
        });

        listEl.delegate('click', '.m-operate .m-delete', function (ev) {
            var el = $(ev.currentTarget).parent().parent(),
                index = el.index();
            console.log(index);
            self.mList.splice(index, 1);
            localStorage.setItem('playlist', JSON.stringify(self.mList));
            el.remove();
            if (index < self.currentPlay) {
                self.currentPlay--;
            } else if (index === self.currentPlay) {
                console.log(index);
                self.playOther(index);
                self.audio.pause();
                self.animCD.pause();
                $('.toggle').css('background-position', '-34px -44px');
            }
            ev.halt();
        });

        listEl.delegate('click', '.m-operate .m-download', function (ev) {
            ev.stopPropagation();
        });
    }

    Player.prototype.playOther = function (index) {
        var self = this,
            handler = $('.handler'),
            handPos = 0;

        if (this.mList.length === 0) {
            this.animImg.css('background-image', 'url(resource/img/default.jpg)');
            handler.css('left', handPos - 1 + '%');
            this.audio.remove();
            this.audio = $('<audio></audio>')[0];
            this.el.append(this.audio);
            return;
        }

        if (index >= this.mList.length)
            index = 0;
        if (index < 0)
            index = this.mList.length - 1;
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

        $($('.p-info a')[0]).html(this.mList[this.currentPlay].title);
        $($('.p-info a')[1]).html(this.mList[this.currentPlay].artist);
        $($('.p-info a')[2]).html(this.mList[this.currentPlay].album);
        
        if (this.animCD.isPaused())
            this.animCD.resume();
        if (!this.animCD.isRunning())
            this.animCD.run();

        this.animImg.css('background-image', 'url("' + this.mList[this.currentPlay].img + '")');
    }

    Player.prototype.initTeyeWrap = function () {
        var self = this,
            nav = $('.type-nav'),
            navItem = nav.all('a'),
            typeSection = $('.t-section'),
            typePage = $('.t-section>li'),
            cListEl = $('.t-chinese .t-list'),
            current = 1,
            isAnimating = false,
            aCount = 0,
            i = 0,
            chineseList = [],
            westernList = [],
            jkList = [],
            rankList = [],
            listStr = '';

        for (; i < this.musicData.chinese.length; i++) {
            chineseList.push(new XTemplate(TypeTpl).render(this.musicData.chinese[i]));
        };
        listStr = chineseList.join('\n');
        cListEl.append(listStr);

        cListEl.delegate('click', '.t-list .add-plist', function (ev) {
            var t = $(ev.currentTarget);
            self.addToPlaylist('chinese', t.parent().parent().index());
            ev.halt();
        });
        cListEl.delegate('click', '.t-list .play-now', function (ev) {
            var t = $(ev.currentTarget);
            self.addToPlaylist('chinese', t.parent().parent().index());
            self.playOther(self.mList.length - 1);
            $('.toggle').css('background-position', '-264px -3px');
            ev.halt();
        });

        $(typePage[current - 1]).css({
            'opacity': 1,
            'z-index': 150
        });

        i = 1;
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
                    opacity: 0,
                    'z-index': 100
                },
                navInNext = {
                    transform: 'translateX(0)',
                    'z-index': 150
                },
                animOutCfg = {
                    duration: 1.2,
                    easing: 'cubic-bezier(0.7, 0, 0.3, 1)',
                    complete: function () {
                        --aCount;
                        if (aCount === 0) {
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
                        if (aCount === 0) {
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
                    opacity: 1,
                }).animate(navInNext, animInCfg);
                ++aCount;

                isAnimating = true;
            }
        });

    }

    Player.prototype.addToPlaylist = function (type, index) {
        var data = this.musicData[type][index];
        this.mList.push(data);
        localStorage.setItem('playlist', JSON.stringify(this.mList));
        $('.music-list .m-list').append(new XTemplate(ListTpl).render(data));

    }

    Player.prototype.searchHandler = function () {
        var searchBar = $('.search-bar'),
            searchInput = $('.search-bar>input');

        searchInput.on('focusin', function () {
            searchBar.css('box-shadow', '0 0 6px');
        });
        searchInput.on('focusout', function () {
            searchBar.css('box-shadow', 'none');
        });
    }

    return Player;
}, {
    requires: ['node', 'anim', 'xtemplate', 'player/tpl/mListItem-xtpl', 'player/tpl/tListItem-xtpl']
});