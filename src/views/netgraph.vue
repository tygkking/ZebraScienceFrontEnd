<template>
    <div id="myChart" :style="{width: '400px', height: '250px'}"></div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "netgraph",
        props:{
            cop:'',
            man:'',
        },
        data(){
            return{
                webkitDep :{
                    "type": "force",
                    "categories": [//关系网类别，可以写多组
                        {
                            "name": ""//关系网名称
                        },
                    ],
                    "nodes": [//展示的节点
                        // {
                        //     "name": "111111",//节点名称
                        //     "category": 0//与关系网类别索引对应，此处只有一个关系网所以这里写0
                        // },
                    ],
                    "links": [//节点之间连接
                        // {
                        //     "source": 0,//起始节点，0表示第一个节点
                        //     "target": 1, //目标节点，1表示与索引为1的节点进行连接,
                        //     "value":4,
                        // },
                    ]
                }
            }
        },
        mounted() {
            this.deal_data();
            this.draw();
        },
        methods:{
            deal_data(){
                var data = this.cop;
                var node = [];
                node[0] = {
                    "category":0,
                    "name":this.man
                };
                this.webkitDep.categories[0].name = this.man;
                this.webkitDep.categories[1]={"name":data[0].count};
                var link = [];
                var count = data[0].count;//14 7 5 5
                var cp = 1;
                for (var i = 1; i < data.length; i++) {
                    if(parseInt(data[i-1].count) < parseInt(count)){
                        count = data[i-1].count;
                        this.webkitDep.categories[++cp]={"name":count}
                    }
                    node[i] = {
                        "category":cp,
                        "name": data[i-1].name
                    };
                    link[i-1] = {
                        "source": 0,//起始节点，0表示第一个节点
                        "target": i, //目标节点，1表示与索引为1的节点进行连接,
                        "value":data[i-1].count,
                    }
                }
                console.log(this.webkitDep.categories);
                this.webkitDep.links = link;
                this.webkitDep.nodes = node;
            },
            draw(){
                let myChart = echarts.init(document.getElementById('myChart'));
                myChart.setOption({
                    title: {
                        text: '专家关系图',
                        top: 'head',
                    },
                    tooltip: {},
                    animation: false,
                    series : [
                        {
                            name: 'Les Miserables',
                            type: 'graph',
                            layout: 'force',
                            force:{
                                repulsion:200,
                                edgeLength:50
                            },
                            data: this.webkitDep.nodes.map(function (node, idx) {
                                node.id = idx;
                                return node;
                            }),
                            edges: this.webkitDep.links,
                            categories: this.webkitDep.categories,
                            roam: true,
                            label: {
                                normal: {
                                    position: 'right',
                                    formatter: '{b}',
                                    show:true
                                }
                            },
                            edgeLabel:{
                                normal:{
                                    formatter:"{c}",
                                    show:true
                                }
                            },
                            lineStyle: {
                                normal: {
                                    color: 'source',
                                    show:true
                                }
                            },
                            draggable:true
                        }
                    ]
                });
            },
        }
    }
</script>

<style scoped>

</style>