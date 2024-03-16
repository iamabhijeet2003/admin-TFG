<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card mt-5 col-6">
                    <chartView1></chartView1>
                </div>
                <div>
                    <chartView2></chartView2>
                </div>
            </div>
        </div>
        
    </div>
    
</template>


<script>
import chartView1 from '../components/dashboard/charts/ChartView1.vue';
import chartView2 from '../components/dashboard/charts/ChartView2.vue';

export default{
    components:{
        chartView1,
        chartView2
    }
}
</script>../components/dashboard/charts/ChartView1.vue