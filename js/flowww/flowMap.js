const flowMap = 
{
    components:
    {
        "flowPart": flowPart,
    },

    data()
    {
        return {
            scale: 1,

            map:
            [
                {
                    text: "1111111",
                    children:
                    [
                        {
                            text: "1AAAAAA",
                        },

                        {
                            text: "1BBBBBBB",
                            connectToID: 5,
                            children:
                            [
                                {
                                    text: "テスト手sつおでちｌｋです！",
                                    connectToID: 5,
                                }
                            ]
                        },

                    ]
                },

                {
                    text: "2222222",
                    children: 
                    [
                        {
                            text: "2AAAAAA",
                        },

                        {
                            text: "2BBBBBBB",
                        },

                        {
                            text: "2cccccccc",

                            children:
                            [
                                {
                                    text: "2caaaaaaa",
                                },

                                {
                                    text: "2cbbbbbbb",
                                }
                            ]
                        },

                        {
                            text: "2dddd",
                        },

                        {
                            text: "2eeeeeeeeeeeeeee",
                        },

                        {
                            text: "2fffffffffffff",
                        },

                                                
                    ]
                },
            ]
        }
    },

    template: `
        
        <input type="range" value="1" step="0.1" min="0.25" max="2" @input="zoom">
        <div ref="canvas" :style="'transform:scale('+ scale +');transform-origin:0 0;'">
            <div class="flex_column"  ref="map">
                <flowPart v-for="part in map" :current="part" :targetCanvas="$refs.canvas" :onRedered="rendered" :onChangeData="onChangeData">

                </flowPart>
            </div>
        </div>

        <!-- <svg  z-index="0" xmlns="http://www.w3.org/2000/svg" version="1.1" style="width:100%;height:100%;shape-rendering: crispEdges;"  class="SvgFrame">
        </svg> -->
    `,

    provide()
    {
        return{
            drawLines: this.lines
        }
    },

    methods:
    {
        zoom(e)
        {
            this.$nextTick(function()
            {
                this.clear();
            });

            this.scale = e.target.value;
        },

        onChangeData()
        {
            this.$nextTick(function()
            {
                this.clear();
                this.drawd(null, this.map);
            });
        },

        posAdjustX(x)
        {
            const dis_scale = (1 / this.scale);
            return x - (8 * dis_scale) + (window.pageXOffset * dis_scale);
        },

        posAdjustY(y)
        {
            const dis_scale = (1 / this.scale);
            return y - (8 * dis_scale) + (window.pageYOffset * dis_scale);
        },


        getRect(element)
        {
            const bb = element.getBoundingClientRect();
            const dis_scale = (1 / this.scale); //反比例!!!
            return { x: element.offsetLeft, y: element.offsetTop, width: element.offsetWidth, height: element.offsetHeight };
            // return { x: bb.x * dis_scale, y: bb.y * dis_scale, width: element.offsetWidth, height: element.offsetHeight };
        },

        getFlowPartCaseRect(id)
        {
            return this.getRect(document.getElementById(id).parentElement);
        },

        getFlowPartRect(id)
        {
            return this.getRect(document.getElementById(id));
        },

        createPathElement(d, left, top, width, height)
        {
            const paths = document.createElementNS('http://www.w3.org/2000/svg', "path");
            paths.setAttribute("d", d);
            paths.style.stroke = "gray";
            paths.style.strokeWidth = "2";
            paths.style.fill = "gray";

            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            // svg.style.shapeRendering = "crispedges";
            svg.style.width = width;
            svg.style.height = height;
            svg.appendChild(paths);

            console.log(height);

            const div = document.createElement("div");
            div.style.position = "absolute";
            // div.style.left = this.posAdjustX(left) ;
            // div.style.top = this.posAdjustY(top);
            div.style.width = width;
            div.style.height = height;
            
            div.style.pointerEvents = "none";
            div.className = "arrow_element";
            div.appendChild(svg);
        
            return div;
        },

        aaa(map, flowPartParent)
        {
            const canvas = this.$refs.canvas;
            const arrowbox = document.getElementById(flowPartParent.arrowBoxId);
            const parent_case_rect = this.getFlowPartCaseRect(flowPartParent.partId);

            const arrow_box_rect = this.getRect(arrowbox);
            let height  = arrow_box_rect.height;
            const path = [];

            if (flowPartParent.children != null)
            {
                const h_begin_rect = this.getFlowPartCaseRect(flowPartParent.children[0].partId);
                const h_end_rect = this.getFlowPartCaseRect(flowPartParent.children[flowPartParent.children.length - 1].partId);

                const middle_y = Math.round(height / 2);

                for (const child_flow of flowPartParent.children)
                {
                    const case_bb = this.getFlowPartCaseRect(child_flow.partId);
                    const x = Math.round(((case_bb.width / 2) + case_bb.x) - arrow_box_rect.x);
                    const y = height - 4;

                    path.push("M", x, middle_y);
                    path.push("L", x, y); 

                    if (child_flow.connectToID != null)
                    {
                        const rect_bb = this.getFlowPartRect(child_flow.partId);

                        const to_rect = this.getFlowPartRect(`part_${child_flow.connectToID}`);

                        const from_x = 0;
                        const from_y = case_bb.height / 2;
                        const to_x = to_rect.x - (rect_bb.x + rect_bb.width);
                        const to_y = case_bb.height / 2;

                        const pp = [];

                        if (rect_bb.y == to_rect.y)
                        {
                            pp.push("M", from_x, from_y);
                            pp.push("L", to_x, to_y);    
                        }
                        else
                        {
                            pp.push("M", from_x, from_y);
                            pp.push("L", to_x / 2, to_y);
                            pp.push("M", to_x / 2, to_y);  
                            pp.push("L", to_x / 2, to_y);  
                        }

                        this.createArrowTriPathToRight(to_x, to_y).forEach(arr => pp.push(arr));

                        const area_height = ((to_rect.y + to_rect.height) - rect_bb.y);

                        const ppp = this.createPathElement(pp.join(" "), 
                        0,
                        0, 
                        to_x, 
                        area_height);

                        ppp.style.left = rect_bb.x + rect_bb.width;
                        ppp.style.top = case_bb.y - (0);

                        canvas.appendChild(ppp);

                        console.log(to_rect);
                    }
        
                    
                    this.createArrowTriPath(x, height).forEach(arr => path.push(arr));
                }

                const h_line_begin_x = Math.round(((h_begin_rect.width / 2) + h_begin_rect.x) - arrow_box_rect.x) - 1;
                // const h_line_begin_x = Math.round(h_begin_rect.width / 2) - 1;
                const h_line_end_x = Math.round(((h_end_rect.width / 2) + h_end_rect.x) - arrow_box_rect.x) + 1;

                path.push("M", h_line_begin_x, middle_y);
                path.push("L", h_line_end_x, middle_y);                

                path.push("M", Math.round(arrow_box_rect.width / 2), 0);
                path.push("L", Math.round(arrow_box_rect.width / 2), middle_y);
            }

            const p = this.createPathElement(path.join(" "), 
            parent_case_rect.x,
            parent_case_rect.bottom, 
            Math.round(parent_case_rect.width), 
            height);

            arrowbox.appendChild(p);
        },
        
        createArrowTriPath(x, y, dir)
        {
            const size = 6;

            const 
            bx = Math.round(x  - size / 2); 
            by = y - size - 2;

            const path = 
            [
                "M", 
                    bx,
                    by,

                "L", 
                    bx + size,
                    by,
                
                "L",
                    bx + (size / 2),
                    by + size,
                
                "Z"
            ];

            return path;
        },

        createArrowTriPathToRight(x, y)
        {
            const size = 6;

            const 
            by = Math.round(y  - size / 2); 
            bx = x - size - 2;

            const path = 
            [
                "M", 
                    bx,
                    by,

                "L", 
                    bx + size,
                    by + (size / 2),
                
                "L",
                    bx,
                    by + size,
                
                "Z"
            ];

            return path;
        },

        createVerticaLlineFromFlowPart(flowPart, flowPartParent)
        {
            const canvas = this.$refs.canvas;
            
            const target_element_bb = document.getElementById(flowPart.ID).getBoundingClientRect();
            const parent_ele_bb = document.getElementById(flowPartParent.ID).getBoundingClientRect();

            const h_begin_x = Math.round(target_element_bb.x + (target_element_bb.width / 2));
            const v_begin_y = (target_element_bb.y - parent_ele_bb.bottom) / 2;

            const path = 
            [
                //開始地点の座標を計算
                "M", 
                    (1),
                    (0),

                //接続先の座標を計算
                "L", 
                    (1),
                    (v_begin_y - 2),
            ];

            return this.createPathElement(path.join(" "), h_begin_x - 1, (target_element_bb.y - v_begin_y - 1));
        },

        createArrowTriFromFlowPart(flowPart, flowPartParent)
        {
            const canvas = this.$refs.canvas;

            const target_element_bb = document.getElementById(flowPart.ID).getBoundingClientRect();
            const parent_ele_bb = document.getElementById(flowPartParent.ID).getBoundingClientRect();
            const size = 6;

            const 
            bx = Math.round((target_element_bb.x + target_element_bb.width / 2)  - size / 2) - 2, 
            by = target_element_bb.y - size - 4;

            const path = 
            [
                //開始地点の座標を計算
                "M", 
                    2,
                    2,

                //接続先の座標を計算
                "L", 
                    size + 2,
                    2,
                
                "L",
                    (size / 2) + 2,
                    size + 2,
                
                "Z"
            ];

            return this.createPathElement(path.join(" "), bx, by);
        },

        clear()
        {
            const canvas = this.$refs.canvas;
            const arrows = canvas.querySelectorAll(".arrow_element");
            arrows.forEach(a => a.remove());
        },

        drawd(parent, map)
        {
            const canvas = this.$refs.canvas;
            
            if (map == null) return ;
            
            if (parent != null)
            {
                this.aaa(map, parent);
                // canvas.app(this.aaa(map, parent), canvas.firstElementChild);
            }

            for (const flow of map)
            {
                // if (parent != null)
                // {
                //     canvas.appendChild(this.createVerticaLlineFromFlowPart(flow, parent));            
                //     canvas.appendChild(this.createArrowTriFromFlowPart(flow, parent));
                // }

                this.drawd(flow, flow.children);
            }
        },

        rendered(target, element)
        {
            // target.

            // target.elementId = `PART_${flowPartID.get()}`
            // element.setAttribute("id", target.elementId);

            // target.element = element;

            // console.log(this.map);
        }
    },

    mounted: function()
    {
        this.$nextTick(function() 
        {
            console.log(this.map);
            console.log("UPDATE");

            this.drawd(null, this.map);
        });
    },

    updated()
    {
        this.$nextTick(function()
        {
            console.log(this.map);
            console.log("UPDATE");

            this.drawd(null, this.map);
        });        
    }
}