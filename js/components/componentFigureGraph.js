const componentFigureGraph = 
{
    props:
    {
        figure:
        {
            type: figure,
        }
    },

    name: "c-figuregraph",

    template: `
        <!-- <template>     -->
            <div style="border:solid 1px gray;text-align: center;">
                <div style="margin:6px;border:solid 1px black;padding:12px;display:inline-block;">
                    {{figure?.text}}
                </div>
                <div style="display:flex;flex-direction:columns;">
                    <c-figuregraph v-for="f in figure?.children" :figure="f"></c-figuregraph>
                </div>
            </div>
        <!-- </template> -->
    `
}