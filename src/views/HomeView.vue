<template>
    <div class="container" style="margin-left: 250px;">
        <div class="row">
            <div class="col">
                <div>
                    <chartView3></chartView3>
                </div>
                <div class="card mt-5 col-6">
                    <chartView1></chartView1>
                </div>
                <div>
                    <TotalSales></TotalSales>
                </div>
                <div>
                    <chartView2></chartView2>
                </div>
                
                <div class="col-12">
                    <chartView4></chartView4>
                </div>
                <div>
                    <chartView5></chartView5>
                </div>
            </div>
        </div>
        
    </div>
    
</template>


<script>
import chartView1 from '../components/dashboard/charts/ChartView1.vue';
import chartView2 from '../components/dashboard/charts/ChartView2.vue';
import chartView3 from '../components/dashboard/charts/ChartView3Sales.vue';
import chartView4 from '../components/dashboard/charts/ChartView4.vue';
import chartView5 from '../components/dashboard/charts/ChartView5.vue';
import TotalSales from '../components/dashboard/TotalSales.vue'
export default{
    components:{
        chartView1,
        chartView2,
        chartView3,
        chartView4,
        chartView5,
        TotalSales
    }
}
</script>../components/dashboard/charts/ChartView1.vue