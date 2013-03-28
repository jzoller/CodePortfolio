import RodCutters.EfficientRodCutter

class TestEfficientRodCutter extends TestRodCutter
{
    @Override
    def getRodCutter(price)
    {
        new EfficientRodCutter(price)
    }
}