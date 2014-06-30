/** Compiled By kissy-xtemplate */
KISSY.add(function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '<li>\r\n    <a class="t-song" title="';
            var id0 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 2);
            buffer += renderOutputUtil(id0, true);
            buffer += '" href="#">';
            var id1 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 2);
            buffer += renderOutputUtil(id1, true);
            buffer += '</a>\r\n    <a class="t-singer" title="';
            var id2 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist", 0, 3);
            buffer += renderOutputUtil(id2, true);
            buffer += '" href="#">';
            var id3 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist", 0, 3);
            buffer += renderOutputUtil(id3, true);
            buffer += '</a>\r\n    <span class="t-control">\r\n        <span class="add-plist" title="添加"></span>\r\n        <span class="play-now" title="播放"></span>\r\n        <a class="download" href="';
            var id4 = getPropertyOrRunCommandUtil(engine, scope, {}, "src", 0, 7);
            buffer += renderOutputUtil(id4, true);
            buffer += '" download="';
            var id5 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist", 0, 7);
            buffer += renderOutputUtil(id5, true);
            buffer += '-';
            var id6 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 7);
            buffer += renderOutputUtil(id6, true);
            buffer += '" title="下载"></a>\r\n    </span>\r\n</li>';
            return buffer;
        };
});