import RodCutters.EfficientRodCutter

class TestTimeConsumed extends TestRodCutter
{
    def efficientRodCutter

    def setup()
    {
        efficientRodCutter = new EfficientRodCutter(price)
    }

    def measureTime =
        {
            Closure closure ->
            def startTime = System.currentTimeMillis()
            closure()
            System.currentTimeMillis() - startTime
        }

    def "test If EfficientRodCutter Is Faster than RodCutter"()
    {
        def efficientRodCutterPerformanceTime =
            measureTime{efficientRodCutter.cutRod(10)}
        def rodCutterPerformanceTime =
            measureTime{rodCutter.cutRod(10)}
        expect:
         efficientRodCutterPerformanceTime < rodCutterPerformanceTime
    }
}
