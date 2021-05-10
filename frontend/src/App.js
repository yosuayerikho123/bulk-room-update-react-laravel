import { Fragment, useEffect, useRef, useState } from "react";
import moment from "moment";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

function App() {

    const [rooms, setRooms] = useState(Array(30));
    const [onHover, setOnHover] = useState(false);
    const [selectedArray, setSelectedArray] = useState([]);

    const [dates, setDates] = useState([]);
	const [count, setCount] = useState(30);
	const [date, setDate] = useState(new Date());

	const flatpickr = useRef();

    function handleScroll(event){

        if (event.target.clientWidth + event.target.scrollLeft === event.target.scrollWidth) {
			
            const datesd = [];
			
			for (var i = 0; i < count + 10; i++) {
				const m = moment(date).add(i, 'days');
				datesd.push({
					moment: m,
					day: m.format('ddd'),
					date: m.format('DD'),
					month: m.format('M')
				});
			}
			
			setCount(count + 10);
			setDates([...datesd]);
        }
		drawSelection();
    }

    useEffect(function() {
        let d = [];
        for (var i = 0; i < 30; i++) {
            const m = moment().add(i, 'days');
            d.push({
                moment: m,
                day: m.format('ddd'),
                date: m.format('DD'),
                month: m.format('M')
            });
        }

        setDates([...d]);
    }, []);

    useEffect(function() {
        let r = Array(3).fill([]);
        r = r.map((item, index) => {
            const rr = [];

            for (let i = 0; i < dates.length; i++) {
                rr.push({
                    price: (index + 1) * 100,
                    selected: false,
                    x: i,
                    y: index
                });
            }

            return rr;
        });

        setRooms(r);
    }, [dates]);

    useEffect(function() {
        drawSelection();
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedArray]);

    function startSelection(y, x, bool) {

        if (!onHover) {
            let arr = selectedArray;
            arr = [];
            arr.push(rooms[y][x]);
            arr.push(rooms[y][x]);

            setSelectedArray([...arr]);

            setOnHover(true);
        } else {
            getSelectedRooms();

            setOnHover(false);
        }
    }

    function getSelectedRooms() {
        if (selectedArray.length === 0) {
            return [];
        }

        return rooms[selectedArray[0].y].filter(function(item, index) {
            return item.selected === true;
        });
    }

    function onSelection(y, x, bool) {
        if (onHover) {
            if (selectedArray.length < 2) {
                let arr = selectedArray;
                arr.push(rooms[y][x]);
                setSelectedArray(arr);
            } else {
                if (y === selectedArray[0].y) {
                    selectedArray[1] = rooms[y][x];
                    setSelectedArray(selectedArray);
                }
            }
        }
        drawSelection();
    }

    function clearSelection() {
        const r = [...rooms];

        for (let i = 0; i < r.length; i++) {
            for (var j = 0; j < r[i].length; j++) {
                r[i][j].selected = false;
            }
        }

        setRooms(r);
    }

    function drawSelection() {
        if (selectedArray.length === 2) {
            clearSelection();

            const start = selectedArray[0];
            const end = selectedArray[1];

            const minimum = end.x < start.x ? end.x : start.x;
            const maximum = end.x > start.x ? end.x : start.x;

            const r = [...rooms];

            for (let i = minimum; i <= maximum; i++) {
                r[start.y][i].selected = true;
            }

            setRooms(r);
        }
    }

	function openFlatPickr(e) {
		if (flatpickr.current != null) {
			flatpickr.current.flatpickr.open()
		}
	}

    return (
        <Fragment>
            <div className="flex h-screen justify-center items-center bg-gray-100">
                <div className="box-border border bg-white p-3 w-10/12">
                    <div className="top">
                        <div onClick={openFlatPickr} className="pr-8 font-medium text-lg flex justify-end h-10 items-center">
							<Flatpickr
								className="font-medium text-lg text-right" 
								data-enable-time
								value={date}
								onChange={date => {
									setDate(date[0]);
									
									let d = [];
									for (var i = 0; i < 30; i++) {
										const m = moment(date[0]).add(i, 'days');
										d.push({
											moment: m,
											day: m.format('ddd'),
											date: m.format('DD'),
											month: m.format('M')
										});
									}
									setDates([...d]);
									clearSelection();
									drawSelection();
								}}
								options={{altInput: true, enableTime: false, dateFormat: "Y-m-d", altFormat: "F j, Y"}}
							/>
                        </div>
                        <div className="relative pt-5 pb-5 flex">
                            <div className="w-4/12 box-border">
                                <div className="h-16">

                                </div>
                                <div className="h-16 flex items-center pl-5">
                                    Luxury
                                </div>
                                <div className="h-16 flex items-center pl-5">
                                    Deluxe
                                </div>
                                <div className="h-16 flex items-center pl-5">
                                    Standar
                                </div>
                            </div>
                            <div className="w-8/12 box-border relative overflow-x-scroll" onScroll={handleScroll}>
                                <div className="h-16 whitespace-nowrap">
                                    {
                                        dates.map(function(item, index){
                                            return (
                                                <div key={index} className="border relative inline-block w-16 h-16">
                                                    <div className="flex flex-col h-full w-full justify-center items-center">
                                                        <span className="font-medium">
                                                            { item.day }
                                                        </span>
                                                        <span className="">
                                                            { item.date } 
															{/* - { item.month } */}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    rooms.map(function(item, y) {
                                        return (
                                            <div className="h-16 whitespace-nowrap" key={y}>
                                                {
                                                    item.map(function(item1, x){

                                                        return (
                                                            <div onClick={() => startSelection(y, x, true)} onMouseOver={() => onSelection(y, x, true)} key={x} className={"border relative inline-block w-16 h-16" + (item1.selected ? ' bg-blue-200' : '')}>
                                                                <span className="absolute" style={{bottom: "2px", right: "5px"}}>
                                                                    ${item1.price}
                                                                </span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
