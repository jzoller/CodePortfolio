package RodCutters

class RodCutter 
{
    def _price

    def RodCutter(price)
    {
        _price = price
    }
  
    def cutRod(length)
    {
        if(length > 0)
        {
            def (priceForLength, cuts) = [0, [length]]
            if(length <= _price.size())
                priceForLength = _price[length]

            for(index in 1..<length)
            {
                def (pricePartI, cutsI) = cutRod(index)
                def (pricePartII, cutsII) = cutRod(length - index)

                if(pricePartI + pricePartII > priceForLength)
                {
                    priceForLength = pricePartI + pricePartII
                    cuts.clear()
                    cuts.addAll(cutsII)
                    cuts.addAll(cutsI)
                }
            }
            [priceForLength, cuts]
        }
        else
            [0, []]
    }
}
