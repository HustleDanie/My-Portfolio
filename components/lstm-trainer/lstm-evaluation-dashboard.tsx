"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, BarChart3, Target, TrendingUp, FileText, Zap, MessageSquare } from "lucide-react"

interface LstmEvaluationDashboardProps {
  onComplete: () => void
}

export function LstmEvaluationDashboard({ onComplete }: LstmEvaluationDashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState("classification")

  // Mock evaluation data - better performance than vanilla RNN
  const classificationMetrics = {
    accuracy: 0.923,
    precision: 0.918,
    recall: 0.927,
    f1Score: 0.922,
    confusionMatrix: [
      [485, 12, 8],
      [9, 456, 15],
      [6, 14, 475],
    ],
    classNames: ["Positive", "Negative", "Neutral"],
  }

  const timeSeriesMetrics = {
    rmse: 1.87,
    mae: 1.42,
    mape: 6.8,
    r2Score: 0.951,
    longTermAccuracy: 0.89,
  }

  const generationMetrics = {
    perplexity: 3.2,
    bleuScore: 0.74,
    coherenceScore: 0.86,
    diversityScore: 0.78,
  }

  const sequenceLabelingMetrics = {
    tokenAccuracy: 0.945,
    entityF1: 0.912,
    sequenceAccuracy: 0.834,
  }

  const handleExport = (type: string) => {
    console.log(`Exporting ${type}...`)
    // Simulate export functionality
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-orbitron text-center">🟤 STEP 6: LSTM Evaluation Dashboard</CardTitle>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Comprehensive analysis of your LSTM model's performance across different tasks
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={selectedMetric} onValueChange={setSelectedMetric}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="classification" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Classification
            </TabsTrigger>
            <TabsTrigger value="timeseries" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Time Series
            </TabsTrigger>
            <TabsTrigger value="generation" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Generation
            </TabsTrigger>
            <TabsTrigger value="labeling" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Seq Labeling
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classification" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-blue-600">
                    {(classificationMetrics.accuracy * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-green-600">
                    {(classificationMetrics.precision * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Precision</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-purple-600">
                    {(classificationMetrics.recall * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Recall</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-orange-600">
                    {(classificationMetrics.f1Score * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">F1-Score</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Confusion Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div></div>
                      {classificationMetrics.classNames.map((name, idx) => (
                        <div key={idx} className="text-center font-semibold dark:text-gray-200">
                          {name}
                        </div>
                      ))}
                    </div>
                    {classificationMetrics.confusionMatrix.map((row, i) => (
                      <div key={i} className="grid grid-cols-4 gap-2">
                        <div className="text-sm font-semibold dark:text-gray-200">
                          {classificationMetrics.classNames[i]}
                        </div>
                        {row.map((value, j) => (
                          <div
                            key={j}
                            className={`text-center p-2 rounded text-sm font-mono ${
                              i === j
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">LSTM vs RNN Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold dark:text-gray-200">LSTM Accuracy</span>
                        <span className="dark:text-gray-300">{(classificationMetrics.accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${classificationMetrics.accuracy * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold dark:text-gray-200">Vanilla RNN (comparison)</span>
                        <span className="dark:text-gray-300">84.7%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div className="bg-gray-400 h-2 rounded-full" style={{ width: "84.7%" }}></div>
                      </div>
                    </div>
                    <div className="pt-2 text-xs text-green-600 dark:text-green-400">
                      ↑ {((classificationMetrics.accuracy - 0.847) * 100).toFixed(1)}% improvement with LSTM
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <h4 className="font-semibold font-space-mono mb-2 dark:text-gray-200">
                  📊 LSTM Classification Analysis:
                </h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>
                    • LSTM achieves {(classificationMetrics.accuracy * 100).toFixed(1)}% accuracy, significantly better
                    than vanilla RNN
                  </li>
                  <li>• Balanced precision and recall indicate excellent generalization</li>
                  <li>• Memory gates effectively capture long-range dependencies in text</li>
                  <li>• Minimal class confusion demonstrates robust feature learning</li>
                  <li>
                    • F1-score of {(classificationMetrics.f1Score * 100).toFixed(1)}% shows consistent performance
                    across classes
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeseries" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-red-600">{timeSeriesMetrics.rmse.toFixed(2)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">RMSE</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-orange-600">{timeSeriesMetrics.mae.toFixed(2)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">MAE</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-purple-600">{timeSeriesMetrics.mape.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">MAPE</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-green-600">{timeSeriesMetrics.r2Score.toFixed(3)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">R² Score</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-blue-600">
                    {(timeSeriesMetrics.longTermAccuracy * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Long-term Acc</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Forecast Accuracy by Horizon</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["1-step", "5-step", "10-step", "20-step"].map((horizon, idx) => (
                      <div key={horizon} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold dark:text-gray-200">{horizon} ahead</span>
                          <span className="dark:text-gray-300">{(95 - idx * 5).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full"
                            style={{ width: `${95 - idx * 5}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Memory Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">Cell State Retention:</h4>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        Maintains 89% accuracy over 100+ time steps
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Pattern Recognition:</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Successfully captures seasonal and trend patterns
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <h4 className="font-semibold font-space-mono mb-2 dark:text-gray-200">📈 LSTM Time Series Analysis:</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• RMSE of {timeSeriesMetrics.rmse} shows excellent prediction accuracy</li>
                  <li>• R² score of {timeSeriesMetrics.r2Score} indicates strong pattern capture</li>
                  <li>• MAPE of {timeSeriesMetrics.mape}% is significantly better than traditional methods</li>
                  <li>
                    • Long-term accuracy of {(timeSeriesMetrics.longTermAccuracy * 100).toFixed(1)}% demonstrates memory
                    retention
                  </li>
                  <li>• LSTM gates effectively handle temporal dependencies and seasonality</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generation" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-purple-600">{generationMetrics.perplexity.toFixed(1)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Perplexity</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-blue-600">
                    {(generationMetrics.bleuScore * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">BLEU Score</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-green-600">
                    {(generationMetrics.coherenceScore * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Coherence</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-orange-600">
                    {(generationMetrics.diversityScore * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Diversity</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Generation Quality Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold dark:text-gray-200">Fluency</span>
                        <span className="dark:text-gray-300">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold dark:text-gray-200">Relevance</span>
                        <span className="dark:text-gray-300">88%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "88%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold dark:text-gray-200">Creativity</span>
                        <span className="dark:text-gray-300">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sample Generated Text</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border">
                      <p className="text-sm font-mono dark:text-gray-300">
                        "The artificial intelligence system learned to understand complex patterns in human language,
                        generating coherent and contextually appropriate responses that demonstrated sophisticated
                        reasoning capabilities."
                      </p>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Generated with perplexity: {generationMetrics.perplexity.toFixed(1)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-4">
                <h4 className="font-semibold font-space-mono mb-2 dark:text-gray-200">📝 LSTM Generation Analysis:</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Low perplexity of {generationMetrics.perplexity.toFixed(1)} indicates confident predictions</li>
                  <li>
                    • BLEU score of {(generationMetrics.bleuScore * 100).toFixed(1)}% shows good similarity to reference
                    text
                  </li>
                  <li>• High coherence score demonstrates logical flow in generated sequences</li>
                  <li>• Balanced diversity prevents repetitive or monotonous output</li>
                  <li>• LSTM memory enables long-range coherence in generated text</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="labeling" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-blue-600">
                    {(sequenceLabelingMetrics.tokenAccuracy * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Token Accuracy</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-green-600">
                    {(sequenceLabelingMetrics.entityF1 * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Entity F1</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-purple-600">
                    {(sequenceLabelingMetrics.sequenceAccuracy * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Sequence Accuracy</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Entity Type Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["PERSON", "ORGANIZATION", "LOCATION", "MISC"].map((entity, idx) => (
                      <div key={entity} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold dark:text-gray-200">{entity}</span>
                          <span className="dark:text-gray-300">{(92 - idx * 2).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${92 - idx * 2}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sequence Labeling Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold dark:text-gray-200">Input Sequence:</div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border font-mono text-sm">
                      <span className="dark:text-gray-300">John</span>{" "}
                      <span className="bg-blue-200 dark:bg-blue-800 px-1 rounded">PERSON</span>{" "}
                      <span className="dark:text-gray-300">works at</span>{" "}
                      <span className="dark:text-gray-300">Google</span>{" "}
                      <span className="bg-green-200 dark:bg-green-800 px-1 rounded">ORG</span>{" "}
                      <span className="dark:text-gray-300">in</span>{" "}
                      <span className="dark:text-gray-300">California</span>{" "}
                      <span className="bg-purple-200 dark:bg-purple-800 px-1 rounded">LOC</span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      LSTM correctly identified all entities with high confidence
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
              <CardContent className="p-4">
                <h4 className="font-semibold font-space-mono mb-2 dark:text-gray-200">
                  🏷️ LSTM Sequence Labeling Analysis:
                </h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>
                    • Token accuracy of {(sequenceLabelingMetrics.tokenAccuracy * 100).toFixed(1)}% shows precise label
                    assignment
                  </li>
                  <li>
                    • Entity F1 of {(sequenceLabelingMetrics.entityF1 * 100).toFixed(1)}% indicates excellent entity
                    boundary detection
                  </li>
                  <li>
                    • Sequence accuracy of {(sequenceLabelingMetrics.sequenceAccuracy * 100).toFixed(1)}% for complete
                    sequence correctness
                  </li>
                  <li>• LSTM context awareness improves entity disambiguation</li>
                  <li>• Bidirectional processing enhances boundary detection accuracy</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Export Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => handleExport("metrics-json")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Metrics as JSON
                  </Button>
                  <Button
                    onClick={() => handleExport("metrics-csv")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Metrics as CSV
                  </Button>
                  <Button
                    onClick={() => handleExport("confusion-matrix")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Confusion Matrix
                  </Button>
                  <Button
                    onClick={() => handleExport("training-history")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Training History
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Export Visualizations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => handleExport("loss-curves")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Loss Curves
                  </Button>
                  <Button
                    onClick={() => handleExport("gate-activations")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Gate Activations
                  </Button>
                  <Button
                    onClick={() => handleExport("memory-states")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Memory States
                  </Button>
                  <Button
                    onClick={() => handleExport("performance-comparison")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export LSTM vs RNN Comparison
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Export Model & Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button onClick={() => handleExport("model-weights")} variant="outline" className="justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export Model Weights (.pt)
                  </Button>
                  <Button onClick={() => handleExport("model-config")} variant="outline" className="justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export Model Config (.json)
                  </Button>
                  <Button onClick={() => handleExport("torchscript")} variant="outline" className="justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export TorchScript Model
                  </Button>
                  <Button onClick={() => handleExport("onnx")} variant="outline" className="justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export ONNX Model
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Export Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-2xl text-blue-600">12</div>
                    <div className="text-gray-600 dark:text-gray-400">Metric Files</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-2xl text-green-600">8</div>
                    <div className="text-gray-600 dark:text-gray-400">Visualizations</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-2xl text-purple-600">4</div>
                    <div className="text-gray-600 dark:text-gray-400">Model Formats</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-2xl text-orange-600">156MB</div>
                    <div className="text-gray-600 dark:text-gray-400">Total Size</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
              <CardContent className="p-4">
                <h4 className="font-semibold font-space-mono mb-2 dark:text-gray-200">💾 Export Recommendations:</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Export model weights for deployment in production environments</li>
                  <li>• Save configuration files for reproducible training runs</li>
                  <li>• Use TorchScript for optimized inference performance</li>
                  <li>• Export ONNX for cross-platform compatibility</li>
                  <li>• Include gate activation patterns for model interpretability</li>
                  <li>• Save memory state visualizations for debugging</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center">
          <Button onClick={onComplete} className="px-8 py-2 font-space-mono">
            Complete LSTM Training Journey
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
