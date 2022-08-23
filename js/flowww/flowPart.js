const flowPart = 
{
    name: "flowPart",
    inject: ["drawLines"],

    props:
    {
        current:
        {
            type: Object
        },

        onRedered:
        {
            type: Function
        },

        onChangeData:
        {
            type: Function
        }
    },

    data()
    {
        return {
            ID: flowPartID.get(),
        }
    },

    mounted()
    { 
        this.current.ID = this.ID;
        this.current.partId = `part_${this.ID}`
        this.current.arrowBoxId = `arrowb_${this.ID}`;
        // if (this.onRedered != null) this.onRedered(this.current, this.$refs.card);
    },

    updated()
    {

    },

    methods:
    {
        click(e)
        {
            console.log(e);

            if (e.children == null) e.children = [];
            e.children.push({ text: "追加です！！！"});

            if (this.onChangeData != null) this.onChangeData(e);
        }
    },

    template: `
        <!-- <div class="guide"> -->
            <div class="group">
                <div class="case">
                    <div class="rect" :id="'part_' + ID" ref="card" @click="click(current)">
                    {{current.text}}
                    </div>
                </div>
                <div class="arrow_box" :id="'arrowb_' + ID">
                        
                </div> 

                <div 
                    <flowclass="flex_column">Part v-for="part in current.children" :current="part" :onRedered="onRedered" :onChangeData="onChangeData">
                    </flowPart>
                </div>

                <div class="connectionBox">
        <div>aaaaa</div>
        </div>

        </div>

    `
}