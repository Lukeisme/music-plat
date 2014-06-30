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
            buffer += '<li class="list-item">\r\n\t\t\t<a href="jacascript:void(0)" title="';
            var id0 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 2);
            buffer += renderOutputUtil(id0, true);
            buffer += '"class="m-title">';
            var id1 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 2);
            buffer += renderOutputUtil(id1, true);
            buffer += '</a>\r\n\t\t\t<a href="jacascript:void(0)" title="';
            var id2 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist", 0, 3);
            buffer += renderOutputUtil(id2, true);
            buffer += '"class="m-artist">';
            var id3 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist", 0, 3);
            buffer += renderOutputUtil(id3, true);
            buffer += '</a>\r\n\t\t\t<a href="jacascript:void(0)" title="';
            var id4 = getPropertyOrRunCommandUtil(engine, scope, {}, "album", 0, 4);
            buffer += renderOutputUtil(id4, true);
            buffer += '"class="m-album">';
            var id5 = getPropertyOrRunCommandUtil(engine, scope, {}, "album", 0, 4);
            buffer += renderOutputUtil(id5, true);
            buffer += '</a>\r\n            <span href="jacascript:void(0)" class="m-operate">\r\n                <a class="m-download" href="';
            var id6 = getPropertyOrRunCommandUtil(engine, scope, {}, "src", 0, 6);
            buffer += renderOutputUtil(id6, true);
            buffer += '" download = "';
            var id7 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist", 0, 6);
            buffer += renderOutputUtil(id7, true);
            buffer += '-';
            var id8 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 6);
            buffer += renderOutputUtil(id8, true);
            buffer += '" title="下载"></a>\r\n                <a class="m-delete" title="删除"></a>\r\n            </span>\r\n</li>';
            return buffer;
        };
});