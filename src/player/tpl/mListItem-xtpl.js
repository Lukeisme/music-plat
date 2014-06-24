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
            buffer += '<li class="list-item">\r\n\t\t\t<a href="jacascript:void(0)" class="m-title">';
            var id0 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 2);
            buffer += renderOutputUtil(id0, true);
            buffer += '</a>\r\n\t\t\t<a href="jacascript:void(0)" class="m-artist">';
            var id1 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist", 0, 3);
            buffer += renderOutputUtil(id1, true);
            buffer += '</a>\r\n\t\t\t<a href="jacascript:void(0)" class="m-album">';
            var id2 = getPropertyOrRunCommandUtil(engine, scope, {}, "album", 0, 4);
            buffer += renderOutputUtil(id2, true);
            buffer += '</a>\r\n            <a href="jacascript:void(0)" class="m-operate"><span class="m-download">↓</span><span class="m-delete">-</span></a>\r\n</li>';
            return buffer;
        };
});