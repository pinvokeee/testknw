/**
 * フロー全体を管理するクラス
 */
class flow
{
    constructor()
    {
        this.charts = [];
    }
    
    /**
     * JSONからFigureインスタンスで構成された配列を生成するクラス
     * @param {source} source 元になるJSONデータ
     */
    loadMap(source)
    {
        this.createFigureTree(this, source);
    }

    /**
     * JSONデータからFigureインスタンスとその入れ子を生成するクラス
     * @param {*} parentFigure 親となるFigureインスタンス
     * @param {*} tree_source 元になるJSONデータ
     */
    createFigureTree(parentFigure, tree_source)
    {
        for (const f of tree_source)
        {
            const new_figure = new figure({ text: f.text });

            if (f.children != null)
            {
                this.createFigureTree(new_figure, f.children);
            }

            parentFigure.addFigure(new_figure);
        }
    }

    addFigure(child)
    {
        this.charts.push(child);
    }
}

/**
 * フローの一部とその子を管理するクラス
 */
class figure
{
    constructor(obj)
    {
        this.text = "";
        this.children = [];

        if (obj == null) return;

        this.text = obj?.text;
    }

    addFigure(child)
    {
        this.children.push(child);
    }
}

const map = 
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