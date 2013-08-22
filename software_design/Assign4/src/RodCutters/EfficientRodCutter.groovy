package RodCutters
class EfficientRodCutter extends RodCutter
{
    def _previousResults

    def EfficientRodCutter(price)
    {
        super(price)
        _previousResults = [[0, []]]
    }

    def cutRod(length)
    {
        if(_previousResults[length] == null)
            _previousResults[length] = super.cutRod(length)
        _previousResults[length]
    }
}