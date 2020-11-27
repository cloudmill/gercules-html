$(() => {

    $(".js--select-tags").each(function () {

        const
            
            component = $(this),

            // titles
            title = {
                desktop: component.find(".js--select-tags--title-desktop"),
                mobile: component.find(".js--select-tags--title-mobile"),
            },

            // controls
            button = {
                reset: component.find(".js--select-tags--button-reset"),
                slide: component.find(".js--select-tags--button-slide"),
            },

            // containers
            container = {
                pool: component.find(".js--select-tags--pool"),
                selection: component.find(".js--select-tags--selection"),
            };

        

        console.log(component[0], title.desktop[0], title.mobile[0], button.reset[0], button.slide[0], container.pool[0], container.selection[0]);

    });

});