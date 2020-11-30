$(() => {

    $(".select-tags").each(function () {

        const

            component = $(this),

            title = component.find(".select-tags__title"),

            button = {
                reset: component.find(".js--select-tags--button-reset"),
                slide: component.find(".select-tags__wrap"),
            },

            container = {
                pool: component.find(".select-tags__wrap"),
                selection: component.find(".js--select-tags--selection"),
            };



        function updateSlideButtonSize() {

            const
                paddingLeft = parseFloat(button.slide.css("padding-left"));
            
            let
                size,
                maxSize;

            button.slide.find(".select-tags__button-text").each(function () {

                size = $(this).width();
                maxSize = maxSize ? (size > maxSize ? size : maxSize) : size;

            });

            button.slide.css("min-width", maxSize + paddingLeft + "px");

        }

        updateSlideButtonSize();
        


        button.slide.on("click", () => {

            button.slide.toggleClass("select-tags__button--active");
            button.slide.find(".select-tags__button-text").toggleClass("select-tags__button-text--active");

            

            const wrapContainer = container.pool.find(".select-tags__wrap-container");

        });

    });

});
