import RodCutters.RodCutter

class TestRodCutter extends spock.lang.Specification
{
	def rodCutter
    def price = [0, 1, 1, 2, 3, 4, 5, 5, 9, 9, 10]

	def setup()
	{
		rodCutter = getRodCutter(price)
	}

    def getRodCutter(price)
    {
        new RodCutter(price)
    }

	def "test Canary"()
	{
		expect:
			true
	}

    def "test for lengths"()
    {
        expect:
            priceAndLengths == rodCutter.cutRod(length)
        where:
            length  |  priceAndLengths
            -1      | [0, []]
            0       | [0, []]
            1       | [1, [1]]
            2       | [2, [1, 1]]
            4       | [4, [1, 1, 1, 1]]
            8       | [9, [8]]
            9       | [10, [8, 1]]
            10      | [11, [8, 1, 1]]
            11      | [12, [8, 1, 1, 1]]
            12      | [13, [8, 1, 1, 1, 1]]
            20      | [22, [8, 8, 1, 1, 1, 1]]
    }

}
