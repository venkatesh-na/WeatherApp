export default function setColor(value)
        {
            switch(value)
            {
                case "Mist":
                case "Dust":
                case "Fog":
                case "Sand":
                case "Ash":
                case "Squall":
                case "Tornado":
                case "Haze":
                    return {one:"rgb(88, 85, 66)",two:"rgb(161, 142, 90)"}
                case "Rain":
                    return {one:"rgb(26, 53, 83)",two:"rgb(57, 76, 116)"}
                case "Clouds":
                        return {one:"rgb(116, 126, 158)",two:"rgb(122, 145, 175)"}
                case "Clear": 
                        return {one:"rgb(77, 88, 255)",two:"rgb(214, 237, 255)"}
                case "Smoke":
                        return {one:"rgb(49, 49, 49)",two:"rgb(48, 48, 48)"}
                case "Thunderstorm":
                    return {one:"rgb(41, 44, 71)",two:"rgb(65, 20, 66)"}
                case "Drizzle":
                    return {one:"rgb(179, 255, 245)",two:"rgb(52, 51, 92)"}
                case "Snow":
                    return {one:"rgb(240, 240, 240)",two:"rgb(146, 146, 146)"}
                default:
                    return {one:"rgb(0, 17, 19)",two:"rgb(0, 17, 19)"}
            }

        }