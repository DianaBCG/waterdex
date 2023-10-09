import './waterquality.css';
import { parseString }  from 'xml2js';

function mapDataFromJSON(json) {
    const keys = Object.keys(json.ResultDescription[0]);

  if (json?.ResultDescription && json?.ResultDescription[0] && keys.includes('CharacteristicName')) {
    const resultDescription = json?.ResultDescription[0];
    const obj = {
      name: resultDescription.CharacteristicName[0],
      depthHeightValue: resultDescription.ResultDepthHeightMeasure ? resultDescription.ResultDepthHeightMeasure[0].MeasureValue[0] : null,
      depthHeightMeasure: resultDescription.ResultDepthHeightMeasure ? resultDescription.ResultDepthHeightMeasure[0].MeasureUnitCode[0] : null,
      resultUnit: resultDescription.ResultMeasure[0].MeasureUnitCode[0],
      resultValue: resultDescription.ResultMeasure[0].ResultMeasureValue[0],
    }
    return obj;
  }
  return null;
}

// const xmlInput = `<Result><ResultDescription><CharacteristicName>Temperature, water</CharacteristicName><ResultSampleFractionText>Total</ResultSampleFractionText><ResultMeasure><ResultMeasureValue>66.4</ResultMeasureValue><MeasureUnitCode>deg F</MeasureUnitCode></ResultMeasure><ResultStatusIdentifier>Final</ResultStatusIdentifier><ResultValueTypeName>Actual</ResultValueTypeName><ResultDepthHeightMeasure><MeasureValue>0</MeasureValue><MeasureUnitCode>ft</MeasureUnitCode></ResultDepthHeightMeasure></ResultDescription></Result><Result><ResultDescription><CharacteristicName>Dissolved oxygen (DO)</CharacteristicName><ResultSampleFractionText>Dissolved</ResultSampleFractionText><ResultMeasure><ResultMeasureValue>1.25</ResultMeasureValue><MeasureUnitCode>mg/L</MeasureUnitCode></ResultMeasure><ResultStatusIdentifier>Final</ResultStatusIdentifier><ResultValueTypeName>Actual</ResultValueTypeName><ResultDepthHeightMeasure><MeasureValue>14</MeasureValue><MeasureUnitCode>m</MeasureUnitCode></ResultDepthHeightMeasure></ResultDescription></Result><Result><ResultDescription><CharacteristicName>Phosphorus</CharacteristicName><ResultSampleFractionText>Total</ResultSampleFractionText><ResultMeasure><ResultMeasureValue>0.0676</ResultMeasureValue><MeasureUnitCode>mg/L</MeasureUnitCode></ResultMeasure><ResultStatusIdentifier>Final</ResultStatusIdentifier><ResultValueTypeName>Actual</ResultValueTypeName></ResultDescription><ResultAnalyticalMethod><MethodIdentifier>365.1</MethodIdentifier><MethodIdentifierContext>USEPA</MethodIdentifierContext><MethodName>Phosphorus by Colorimetry</MethodName><MethodDescriptionText>https://www.nemi.gov/methods/method_summary/4823/</MethodDescriptionText></ResultAnalyticalMethod><ResultLabInformation><LaboratoryName>113133790</LaboratoryName><AnalysisStartDate>2023-09-21</AnalysisStartDate><ResultDetectionQuantitationLimit><DetectionQuantitationLimitTypeName>Lower Quantitation Limit</DetectionQuantitationLimitTypeName><DetectionQuantitationLimitMeasure><MeasureValue>0.0300</MeasureValue><MeasureUnitCode>mg/L</MeasureUnitCode></DetectionQuantitationLimitMeasure></ResultDetectionQuantitationLimit></ResultLabInformation></Result><Result><ResultDescription><CharacteristicName>Chlorophyll a (probe relative fluorescence)</CharacteristicName><ResultSampleFractionText>Total</ResultSampleFractionText><ResultMeasure><ResultMeasureValue>9.03</ResultMeasureValue><MeasureUnitCode>ug/L</MeasureUnitCode></ResultMeasure><ResultStatusIdentifier>Final</ResultStatusIdentifier><ResultValueTypeName>Actual</ResultValueTypeName></ResultDescription><ResultAnalyticalMethod><MethodIdentifier>445.0</MethodIdentifier><MethodIdentifierContext>USEPA</MethodIdentifierContext><MethodName>445.0 ~ EPA; Chlorophyll and Pheophytin in Algae by Fluorescence</MethodName><MethodDescriptionText>https://www.nemi.gov/methods/method_summary/7222/</MethodDescriptionText></ResultAnalyticalMethod><ResultLabInformation><LaboratoryName>113133790</LaboratoryName><AnalysisStartDate>2023-09-15</AnalysisStartDate><ResultDetectionQuantitationLimit><DetectionQuantitationLimitTypeName>Lower Quantitation Limit</DetectionQuantitationLimitTypeName><DetectionQuantitationLimitMeasure><MeasureValue>0.870</MeasureValue><MeasureUnitCode>ug/L</MeasureUnitCode></DetectionQuantitationLimitMeasure></ResultDetectionQuantitationLimit></ResultLabInformation></Result><Result><ResultDescription><CharacteristicName>pH</CharacteristicName><ResultSampleFractionText>Total</ResultSampleFractionText><ResultMeasure><ResultMeasureValue>6.71</ResultMeasureValue><MeasureUnitCode>None</MeasureUnitCode></ResultMeasure><ResultStatusIdentifier>Final</ResultStatusIdentifier><ResultValueTypeName>Actual</ResultValueTypeName><ResultDepthHeightMeasure><MeasureValue>14</MeasureValue><MeasureUnitCode>m</MeasureUnitCode></ResultDepthHeightMeasure></ResultDescription></Result><Result><ResultDescription><CharacteristicName>Specific conductance</CharacteristicName><ResultMeasure><ResultMeasureValue>118.7</ResultMeasureValue><MeasureUnitCode>umho/cm</MeasureUnitCode></ResultMeasure><ResultStatusIdentifier>Final</ResultStatusIdentifier><ResultValueTypeName>Actual</ResultValueTypeName><ResultDepthHeightMeasure><MeasureValue>13</MeasureValue><MeasureUnitCode>m</MeasureUnitCode></ResultDepthHeightMeasure></ResultDescription></Result><Result><ResultDescription><CharacteristicName>Dissolved oxygen saturation</CharacteristicName><ResultMeasure><ResultMeasureValue>10.6</ResultMeasureValue><MeasureUnitCode>%</MeasureUnitCode></ResultMeasure><ResultStatusIdentifier>Final</ResultStatusIdentifier><ResultValueTypeName>Actual</ResultValueTypeName><ResultDepthHeightMeasure><MeasureValue>13</MeasureValue><MeasureUnitCode>m</MeasureUnitCode></ResultDepthHeightMeasure></ResultDescription></Result>`

function WaterQuality(props) {
  const {info, color="yellow"} =  props

  const xmlArray = info.split('</Result>');
  const quality = [];
  xmlArray.forEach((result) => parseString(`${result}</Result>`, function (err, resultJson) {
    if (resultJson && resultJson.Result) {
      quality.push(mapDataFromJSON(resultJson.Result));
    } 
  }))

  return (
    <div className="quality-container">
      <img src={`./axo_${color}.png`} className={"flag"} />
      WaterQuality
      <div className="info-cont">
        {quality.map((item) => (
          <div className="info">
            <div className="attribute">{item.name}</div>
            <div className="value">
              {`${item.resultValue} ${item.name === 'pH' ? '' : item.resultUnit}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WaterQuality;