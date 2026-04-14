export const RarityColor = {
    COMMON: {

        getBackground: (ctx, canvas) => {

            return "#565656";

        },
        getGlow: (ctx, canvas) => {
            const glow = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)

            glow.addColorStop(0, "rgba(255,255,220,0.5)")
            glow.addColorStop(0.15, "rgba(222,222,222,0.2)")
            glow.addColorStop(0.45, "rgba(253,253,253,0.1)")
            glow.addColorStop(1, "rgba(0,0,0,0)")

            return glow
        },
        getBadgeBackground: (ctx, canvas) => {
            return "#c0c0c0";
        },
        getBadgeFont: (ctx, canvas) => {

            return "#262626"

        }



    },
    UNCOMMON: {

        getBackground: (ctx, canvas) => {

            return "#102c00";

        },


        getGlow: (ctx, canvas) => {
            const glow = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)

            glow.addColorStop(0, "rgba(38,227,0,0.7)")
            glow.addColorStop(0.15, "rgba(92,169,0,0.5)")
            glow.addColorStop(0.45, "rgba(1,129,7,0.2)")
            glow.addColorStop(1, "rgba(0,0,0,0)")

            return glow
        },
        getBadgeBackground: (ctx, canvas) => {

            return "#1f4b07";

        },
        getBadgeFont: (ctx, canvas) => {

            return "#418649"

        }
    },
    RARE: {
        getBackground: (ctx, canvas) => {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
            gradient.addColorStop(0, "#003cf3")
            gradient.addColorStop(0.5, "#002288")
            gradient.addColorStop(1, "#001249")
            return gradient
        },
        getGlow: (ctx, canvas) => {
            const glow = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)

            glow.addColorStop(0, "rgba(0,255,189,0.7)")
            glow.addColorStop(0.15, "rgba(0,50,217,0.5)")
            glow.addColorStop(0.45, "rgba(0,33,108,0.2)")
            glow.addColorStop(1, "rgba(0,0,0,0)")

            return glow
        },
        getBadgeBackground: (ctx, canvas) => {

            return "#004d56";

        },
        getBadgeFont: (ctx, canvas) => {

            return "#88b7ee"

        }

    },
    EPIC: {

        getBackground: (ctx, canvas) => {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
            gradient.addColorStop(0, "#6100f3")
            gradient.addColorStop(0.5, "#510073")
            gradient.addColorStop(1, "#c302fc")
            return gradient
        },
        getGlow: (ctx, canvas) => {
            const glow = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)

            glow.addColorStop(0, "rgb(255,0,211)")
            glow.addColorStop(0.15, "rgb(224,0,255)")
            glow.addColorStop(0.45, "rgba(234,87,250,0.19)")
            glow.addColorStop(1, "rgba(214,80,255,0.0)")

            return glow
        },
        getBadgeBackground: (ctx, canvas) => {

            return "#c302fc";

        },
        getBadgeFont: (ctx, canvas) => {

            return "#f8a3ff"

        }
    },
    LEGENDARY: {
        getBackground: (ctx, canvas) => {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
            gradient.addColorStop(0, "#f3ba00")
            gradient.addColorStop(0.5, "#a65300")
            gradient.addColorStop(0.75, "#f3de23")
            gradient.addColorStop(1, "#ffe600")
            return gradient
        },
        getGlow: (ctx, canvas)  => {
            const glow = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)

            glow.addColorStop(0, "rgb(255,239,0)")
            glow.addColorStop(0.15, "rgb(255,153,40)")
            glow.addColorStop(0.45, "rgba(255,210,99,0.87)")
            glow.addColorStop(1, "rgba(255,252,0,0)")

            return glow
        },
        getBadgeBackground: (ctx, canvas) => {

            return "#7a6e00";

        },
        getBadgeFont: (ctx, canvas) => {

            return "#04006e"

        }
    },
    UNIQUE: {
        getBackground: (ctx, canvas) => {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
            gradient.addColorStop(0, "#0aff00")
            gradient.addColorStop(0.25, "#ff7f00")
            gradient.addColorStop(0.5, "#ff6a76")
            gradient.addColorStop(0.75, "#008660")
            return gradient
        },
        getGlow: (ctx, canvas) => {
            const glow = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)

            glow.addColorStop(0, "rgb(255,252,0)")
            glow.addColorStop(0.15, "rgb(126,0,255)")
            glow.addColorStop(0.45, "rgba(0,255,194,0.87)")
            glow.addColorStop(1, "rgba(255,0,0,0)")

            return glow
        },
        getBadgeBackground: (ctx, canvas) => {

            const gradient = ctx.createLinearGradient(0, 0, 400, 10)
            gradient.addColorStop(0, "#0aff00")
            gradient.addColorStop(0.25, "#ff7f00")
            gradient.addColorStop(0.5, "#ff6a76")
            gradient.addColorStop(0.75, "#008660")

            return gradient

        },
        getBadgeFont: (ctx, canvas) => {

            return "#ff0000"

        }
    },
}