const App = 
{
    el: "#app",

    vuetify: new Vuetify(),
    
    components:
    {
        // "c-flowmap": componentFlowMap,
    },

    data()
    {
        return {

            knowledgeObjects: [],
            selectedKnowLedge: null,
        }
    },

    mounted()
    {

        this.knowledgeObjects.push(
        {
            subject: "TestSubject",
            answer: "TestAnswer",
            note: "TestNote",
            category: ["CategoryA", "CategoryB", "CategoryC"]
        });

        console.log(this.knowledgeObjects);

        // this.flow = new flow();
        // this.flow.loadMap(map);

        // console.log(this.flow);
        

        // for (let i = 0; i < 100; i++)
        // {
        //     this.items.push(i);
        // }
    },

    computed:
    {

    },

    methods:
    {
        
    },

    template: `
        <v-app>

            <!-- 上部ツールバー -->
            <v-app-bar color="success" elevate-on-scroll app clipped-left>

            </v-app-bar>

            <!-- 下部ツールバー -->
            <!-- <v-app-bar class="pr-4" color="white" elevate-on-scroll bottom app clipped-left>

            </v-app-bar> -->

            <!-- <v-navigation-drawer app clipped permanent width="400">

            </v-navigation-drawer> -->

            <v-main>
                <v-container>
                    <v-row>
                    <v-col class="overflow-auto scrollarea">
                        <v-list dense>
                            <v-subheader  style="position:sticky;top:0;">REPORTS</v-subheader>
                            <v-list-item-group
                                v-model="selectedKnowLedge"
                                color="primary">
                                <v-list-item
                                v-for="(item, i) in knowledgeObjects"
                                :key="i"
                                >
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.subject"></v-list-item-title>                                        
                                    <div>
                                    <!-- v-for="(tagName) in item.category" -->
                                        <template v-slot:activator="{ on }" v-for="(tagName) in item.category">
                                            <v-chip class="ma-1" v-on="on" outlined pill small color="primary">
                                                {{tagName}}
                                            </v-chip>                                    
                                        </template>

                                    </div>
                                </v-list-item-content>

                                </v-list-item>
                            </v-list-item-group>
                        </v-list>

                        </v-col>
                        <v-col class="overflow-auto scrollarea">

                        </v-col>
                        <!-- <v-col class="fill-height">
                            <c-flowmap :flow="flow"></c-flowmap>
                        </v-col> -->
                    </v-row>
                </v-container>
            </v-main>

        </v-app>
    `,
}