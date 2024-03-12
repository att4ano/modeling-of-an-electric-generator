import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const GeneratorSimulation = () => {
    const [magneticField, setMagneticField] = useState(1);
    const [rotationFrequency, setRotationFrequency] = useState(1);
    const [circuitResistance, setCircuitResistance] = useState(1);

    useEffect(() => {
        const ctx = document.getElementById('generatorChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'ЭДС',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2, // Устанавливаем толщину линии
                        data: [],
                    },
                    {
                        label: 'Индукционный ток',
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 2, // Устанавливаем толщину линии
                        data: [],
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Время',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Значение',
                        },
                    },
                },
            },
        });

        const updateChartData = () => {
            const time = [];
            const emf = [];
            const inductionCurrent = [];
            for (let t = 0; t <= 10; t += 0.01) {
                time.push(t.toFixed(2));
                const angularFrequency = 2 * Math.PI * rotationFrequency;
                const emfValue = magneticField * angularFrequency * circuitResistance * Math.sin(angularFrequency * t);
                emf.push(emfValue.toFixed(2));
                const inductionCurrentValue = emfValue / circuitResistance;
                inductionCurrent.push(inductionCurrentValue.toFixed(2));
            }

            // Обновление данных на графике
            chart.data.labels = time;
            chart.data.datasets[0].data = emf;
            chart.data.datasets[1].data = inductionCurrent;
            chart.update();
        };

        updateChartData();

        return () => {
            chart.destroy();
        };
    }, [magneticField, rotationFrequency, circuitResistance]);

    return (
        <div>
            <div>
                <label>
                    Величина магнитного поля:
                    <input
                        type="number"
                        value={magneticField}
                        onChange={(e) => setMagneticField(parseFloat(e.target.value))}
                    />
                </label>
            </div>
            <div>
                <label>
                    Частота вращения:
                    <input
                        type="number"
                        value={rotationFrequency}
                        onChange={(e) => setRotationFrequency(parseFloat(e.target.value))}
                    />
                </label>
            </div>
            <div>
                <label>
                    Сопротивление контура:
                    <input
                        type="number"
                        value={circuitResistance}
                        onChange={(e) => setCircuitResistance(parseFloat(e.target.value))}
                    />
                </label>
            </div>
            <canvas id="generatorChart" width="800" height="400"></canvas>
        </div>
    );
};

export default GeneratorSimulation;
