const componentFlowMap = 
{
    props:
    {
        flow:
        {
            type: flow,
        }
    },

    components:
    {
        "c-figuregraph": componentFigureGraph,
    },

    template: `
        <div style="display:flex;flex-direction:columns;">
            <c-figuregraph v-for="f in flow?.charts" :figure="f"></c-figuregraph>
        </div>

    `
}