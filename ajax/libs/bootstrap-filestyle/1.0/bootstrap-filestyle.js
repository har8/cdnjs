/*
 * bootstrap-filestyle
 * http://markusslima.github.com/bootstrap-filestyle/
 *
 * Copyright (c) 2013 Markus Vinicius da Silva Lima
 * Version 1.0
 * Licensed under the MIT license.
 */
(function ($) {
    "use strict";
    
    var Filestyle = function (element, options) {
        this.options = options;
        this.$elementFilestyle = [];
        this.$element = $(element);
    };

    Filestyle.prototype = {
        clear: function () {
            this.$element.val('');
            this.$elementFilestyle.find(':text').val('');
        },

        icon: function (value) {
            if (value === true) {
                if (!this.options.icon) {
                    this.options.icon = true;
                    this.$elementFilestyle.find('a').prepend(this.htmlIcon());
                }
            } else if (value === false) {
                if (this.options.icon) {
                    this.options.icon = false;
                    this.$elementFilestyle.find('i').remove();
                }
            } else {
                return this.options.icon;
            }
        },

        input: function (value) {
            if (value === true) {
                if (!this.options.input) {
                    this.options.input = true;
                    this.$elementFilestyle.prepend(this.htmlInput());

                    var content = '',
                        files = [];
                    if (this.$element[0].files === undefined) {
                        files[0] = {'name': this.$element[0].value};
                    } else {
                        files = this.$element[0].files;
                    }

                    for (var i = 0; i < files.length; i++) {
                        content += files[i].name.split("\\").pop() + ', ';
                    }
                    if (content !== '') {
                        this.$elementFilestyle.find(':text').val(content.replace(/\, $/g, ''));
                    }
                }
            } else if (value === false) {
                if (this.options.input) {
                    this.options.input = false;
                    this.$elementFilestyle.find(':text').remove();
                }
            } else {
                return this.options.input;
            }
        },

        buttonText: function (value) {
            if (value !== undefined) {
                this.options.buttonText = value;
                this.$elementFilestyle.find('a span').html(this.options.buttonText);
            } else {
                return this.options.buttonText;
            }
        },

        classButton: function (value) {
            if (value !== undefined) {
                this.options.classButton = value;
                this.$elementFilestyle.find('a').attr({'class': this.options.classButton});
                if (this.options.classButton.search(/btn-inverse|btn-primary|btn-danger|btn-warning|btn-success/i) !== -1) {
                    this.$elementFilestyle.find('a i').addClass('icon-white');
                } else {
                    this.$elementFilestyle.find('a i').removeClass('icon-white');
                }
            } else {
                return this.options.classButton;
            }
        },

        classIcon: function (value) {
            if (value !== undefined) {
                this.options.classIcon = value;
                if (this.options.classButton.search(/btn-inverse|btn-primary|btn-danger|btn-warning|btn-success/i) !== -1) {
                    this.$elementFilestyle.find('a').find('i').attr({'class': 'icon-white '+this.options.classIcon});
                } else {
                    this.$elementFilestyle.find('a').find('i').attr({'class': this.options.classIcon});
                }
            } else {
                return this.options.classIcon;
            }
        },

        classInput: function (value) {
            if (value !== undefined) {
                this.options.classInput = value;
                this.$elementFilestyle.find(':text').addClass(this.options.classInput);
            } else {
                return this.options.classInput;
            }
        },

        htmlIcon: function () {
            if (this.options.icon) {
                var colorIcon = '';
                if (this.options.classButton.search(/btn-inverse|btn-primary|btn-danger|btn-warning|btn-success/i) !== -1) {
                    colorIcon = ' icon-white ';
                }

                return '<i class="'+colorIcon+this.options.classIcon+'"></i> ';
            } else {
                return '';
            }
        },

        htmlInput: function () {
            if (this.options.input) {
                return '<input type="text" class="'+this.options.classInput+'" disabled> ';
            } else {
                return '';
            }
        },

        constructor: function () {
            var _self = this,
                html = '',
                files = [];


            html = this.htmlInput()+
                 '<a href="#" class="'+this.options.classButton+'">'+
                    this.htmlIcon()+
                    '<span>'+this.options.buttonText+'</span>'+
                 '</a>';

            this.$elementFilestyle = $('<div style="display: inline;">'+html+'</div>');

            // hidding input file and add filestyle
            this.$element
                .css({'position':'fixed','top':'-500px','left':'-500px'})
                .after(this.$elementFilestyle);

            // Getting input file value
            this.$element.change(function () {
                var content = '';
                if (this.files === undefined) {
                    files[0] = {'name': this.value};
                } else {
                    files = this.files;
                }

                for (var i = 0; i < files.length; i++) {
                    content += files[i].name.split("\\").pop() + ', ';
                }

                if (content !== '') {
                    _self.$elementFilestyle.find(':text').val(content.replace(/\, $/g, ''));
                }
            });

            // Simulating choose file
            this.$elementFilestyle.find('a').click(function () {
                _self.$element.click();
                return false;
            });
        }
    };

    var old = $.fn.filestyle;

    $.fn.filestyle = function (option, value) {
        var get = '',
            element = this.each(function () {
                if ($(this).attr('type') === 'file') {
                    var $this = $(this),
                        data = $this.data('filestyle'),
                        options = $.extend({}, $.fn.filestyle.defaults, option, typeof option === 'object' && option);

                    if (!data) {
                        $this.data('filestyle', (data = new Filestyle(this, options)));
                        data.constructor();
                    }

                    if (typeof option === 'string') {
                        get = data[option](value);
                    }
                }
            });

        if (typeof get !== undefined) {
            return get;
        } else {
            return element;
        }
    };

    $.fn.filestyle.defaults = {
        'buttonText': 'Choose file',
        'input': true,
        'icon': true,
        'classButton': 'btn',
        'classInput': 'input-large',
        'classIcon': 'icon-folder-open'
    };

    $.fn.filestyle.noConflict = function () {
        $.fn.filestyle = old;
        return this;
    };
})(window.jQuery);