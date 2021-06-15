//変数宣言
for (let i = 1; i<=8; i++){
    for(let j=1; j<=8; j++){
        let ij = String(i) + String(j)
        eval("var img_" + ij + "= document.getElementById('img" + ij + "');")
    }
}

let mode = 0;
let turn = -1;   //1が黒、-1が白の手番 (白が先手)
let turnsum = 0;
let old_P = 0; //駒を動かす前の位置
let flag_B = 0; //B_kingが動いたかどうか
let flag_W = 0; //W_kingが動いたかどうか
let flag1 = 0;  //kingと左の黒luke
let flag2 = 0;  //kingと右の黒luke
let flag3 = 0;  //kingと左の白luke
let flag4 = 0;  //kingと右の白luke
let Cas_F = 0; //Castlingしようとしているか
let kifu = []; //棋譜

function changeImage(n){
    if(eval("img_" + n).alt == 1){
        eval("img_" + n).src = "../images/PLAY/chesspieces/bB.png"
    }
    else if(eval("img_" + n).alt == 2){
        eval("img_" + n).src = "../images/PLAY/chesspieces/bK.png"
    }
    else if(eval("img_" + n).alt == 3){
        eval("img_" + n).src = "../images/PLAY/chesspieces/bN.png"
    }
    else if(eval("img_" + n).alt == 4){
        eval("img_" + n).src = "../images/PLAY/chesspieces/bP.png"
    }
    else if(eval("img_" + n).alt == 5){
        eval("img_" + n).src= "../images/PLAY/chesspieces/bQ.png"
    }
    else if(eval("img_" + n).alt == 6){
        eval("img_" + n).src = "../images/PLAY/chesspieces/bR.png"
    }
    else if(eval("img_" + n).alt == -1){
        eval("img_" + n).src = "../images/PLAY/chesspieces/wB.png"
    }
    else if(eval("img_" + n).alt == -2){
        eval("img_" + n).src = "../images/PLAY/chesspieces/wK.png"
    }
    else if(eval("img_" + n).alt == -3){
        eval("img_" + n).src = "../images/PLAY/chesspieces/wN.png"
    }
    else if(eval("img_" + n).alt == -4){
        eval("img_" + n).src = "../images/PLAY/chesspieces/wP.png"
    }
    else if(eval("img_" + n).alt == -5){
        eval("img_" + n).src = "../images/PLAY/chesspieces/wQ.png"
    }
    else if(eval("img_" + n).alt == -6){
        eval("img_" + n).src = "../images/PLAY/chesspieces/wR.png"
    }
    else if(eval("img_" + n).alt == 0){
        eval("img_" + n).src = "../images/PLAY/chesspieces/empty.png"
    }
    else{
        eval("img_" + n).src = "../images/PLAY/chesspieces/empty.png" , eval("img_" + n).alt = 0
    }
};

//渡した座標の背景を変える
function Color_change(n){
    eval("img_" + n).classList.add("komaMove")
};

//駒の大まかな動き
//斜め十字(角)
function Saltire_I(n){
        //左上
        for(let i = n + 11; (1 <= Math.floor(i/10) && Math.floor(i/10) <= 8) && (1 <= Math.floor(i%10) && Math.floor(i%10) <= 8) && ((eval("img_" + n).alt) * eval("img_" + i).alt) <= 0;){
            if((eval("img_" + n).alt * eval("img_" + i).alt) == 0){
                Color_change(i);
                i = i + 11;
            }
            else if((eval("img_" + n).alt * eval("img_" + i).alt) < 0){
                Color_change(i);
                break;
            };
        };
        //右上
        for(let i = n - 11; ((1 <= Math.floor(i/10) && Math.floor(i/10) <= 8) && (1 <= Math.floor(i%10) && Math.floor(i%10) <= 8)) && (eval("img_" + n).alt * eval("img_" + i).alt) <= 0;){
            if((eval("img_" + n).alt * eval("img_" + i).alt) == 0){
                Color_change(i);
                i = i - 11;
            }
            else if((eval("img_" + n).alt * eval("img_" + i).alt) < 0){
                Color_change(i);
                break;
            };
        };
        //左下
        for(let i = n - 9; ((1 <= Math.floor(i/10) && Math.floor(i/10) <= 8) && (1 <= Math.floor(i%10) && Math.floor(i%10) <= 8)) && (eval("img_" + n).alt * eval("img_" + i).alt) <= 0;){
            if((eval("img_" + n).alt * eval("img_" + i).alt) == 0){
                Color_change(i);
                i = i - 9;
            }
            else if((eval("img_" + n).alt * eval("img_" + i).alt) < 0){
                Color_change(i);
                break;
            };
        };
        //右下
        for(let i = n + 9; ((1 <= Math.floor(i/10) && Math.floor(i/10) <= 8) && (1 <= Math.floor(i%10) && Math.floor(i%10) <= 8)) && (eval("img_" + n).alt * eval("img_" + i).alt) <= 0;){
            if((eval("img_" + n).alt * eval("img_" + i).alt) == 0){
                Color_change(i);
                i = i + 9;
            }
            else if((eval("img_" + n).alt * eval("img_" + i).alt) < 0){
                Color_change(i);
                break;
            };
        };
};

//十字(飛車)
function Cross_I(n){
    //上
    for(let i = n + 10; (1 <= Math.floor(i/10) && Math.floor(i/10) <= 8) && (1 <= Math.floor(i%10) && Math.floor(i%10) <= 8) && (eval("img_" + n).alt * eval("img_" + i).alt) <= 0;){
        if((eval("img_" + n).alt * eval("img_" + i).alt) == 0){
            Color_change(i);
            i = i + 10;
        }
        else if((eval("img_" + n).alt * eval("img_" + i).alt) < 0){
            Color_change(i);
            break;
        };
    };
    //右
    for(let i = n - 1; (1 <= Math.floor(i/10) && Math.floor(i/10) <= 8) && (1 <= Math.floor(i%10) && Math.floor(i%10) <= 8) && (eval("img_" + n).alt * eval("img_" + i).alt) <= 0;){
        if((eval("img_" + n).alt * eval("img_" + i).alt) == 0){
            Color_change(i);
            i = i - 1;
        }
        else if((eval("img_" + n).alt * eval("img_" + i).alt) < 0){
            Color_change(i);
            break;
        };
    };
    //下
    for(let i = n - 10; (1 <= Math.floor(i/10) && Math.floor(i/10) <= 8) && (1 <= Math.floor(i%10) && Math.floor(i%10) <= 8) && (eval("img_" + n).alt * eval("img_" + i).alt) <= 0;){
        if((eval("img_" + n).alt * eval("img_" + i).alt) == 0){
            Color_change(i);
            i = i - 10;
        }
        else if((eval("img_" + n).alt * eval("img_" + i).alt) < 0){
            Color_change(i);
            break;
        };
    };
    //左
    for(let i = n + 1; (1 <= Math.floor(i/10) && Math.floor(i/10) <= 8) && (1 <= Math.floor(i%10) && Math.floor(i%10) <= 8) && (eval("img_" + n).alt * eval("img_" + i).alt) <= 0;){
        if((eval("img_" + n).alt * eval("img_" + i).alt) == 0){
            Color_change(i);
            i = i + 1;
        }
        else if((eval("img_" + n).alt * eval("img_" + i).alt) < 0){
            Color_change(i);
            break;
        };
    };
};

//斜め十字(1マス)
function Saltire(n){
    //左上
    if((1 <= Math.floor((n + 11)/10) && Math.floor((n + 11)/10) <= 8) && (1 <= Math.floor((n + 11)%10) && Math.floor((n + 11)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n + 11)).alt) <= 0){
        Color_change(n + 11);
    };
    //右上
    if((1 <= Math.floor((n - 11)/10) && Math.floor((n - 11)/10) <= 8) && (1 <= Math.floor((n - 11)%10) && Math.floor((n - 11)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n - 11)).alt) <= 0){
        Color_change(n - 11);
    };
    //左下
    if((1 <= Math.floor((n + 9)/10) && Math.floor((n + 9)/10) <= 8) && (1 <= Math.floor((n + 9)%10) && Math.floor((n + 9)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n + 9)).alt) <= 0){
        Color_change(n + 9);
    };
    //右下
    if((1 <= Math.floor((n - 9)/10) && Math.floor((n - 9)/10) <= 8) && (1 <= Math.floor((n - 9)%10) && Math.floor((n - 9)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n - 9)).alt) <= 0){
        Color_change(n - 9);
    };
};
//十字(1マス)
function Cross(n){
    //上
    if((1 <= Math.floor((n + 10)/10) && Math.floor((n + 10)/10) <= 8) && (1 <= Math.floor((n + 10)%10) && Math.floor((n + 10)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n + 10)).alt) <= 0){
        Color_change(n + 10);
    };
    //右
    if((1 <= Math.floor((n - 1)/10) && Math.floor((n - 1)/10) <= 8) && (1 <= Math.floor((n - 1)%10) && Math.floor((n - 1)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n - 1)).alt) <= 0){
        Color_change(n - 1);
    };
    //下
    if((1 <= Math.floor((n - 10)/10) && Math.floor((n - 10)/10) <= 8) && (1 <= Math.floor((n - 10)%10) && Math.floor((n - 10)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n - 10)).alt) <= 0){
        Color_change(n - 10);
    };
    //左
    if((1 <= Math.floor((n + 1)/10) && Math.floor((n + 1)/10) <= 8) && (1 <= Math.floor((n + 1)%10) && Math.floor((n + 1)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n + 1)).alt) <= 0){
        Color_change(n + 1);
    };
};

//駒の細かな動き
function Move_V(m,n){
    //ビショップの動き
    if(Math.abs(m) == 1){
        Saltire_I(n);
        eval("img_" + n).classList.remove("komaMove");
    }
    //キングの動き
    else if(Math.abs(m) == 2){
        //メイン
        Saltire(n);
        Cross(n);
        //キャスリング
        //黒キング
        if(m == 2){
            //左側のルークと
            if(flag_B + flag1 + img_28.alt + img_38.alt + img_48.alt == 0){
                Color_change(38);
                Cas_F = 1;
            }
            //右側のルークと
            else if(flag_B + flag2 + img_68.alt + img_78.alt == 0){
                Color_change(78);
                Cas_F = 1;
            };
        }
        //白キング
        else if(m == -2){
            //左側のルークと
            if(flag_W + flag3 + img_21.alt + img_31.alt + img_41.alt == 0){
                Color_change(31);
                Cas_F = 1;
            }
            //右側のルークと
            else if(flag_W + flag4 + img_61.alt + img_71.alt == 0){
                Color_change(71);
                Cas_F = 1;
            };
        };
    }
    //ナイトの動き
    else if(Math.abs(m) == 3){
        //上開きY
        if((1 <= Math.floor((n - 8)/10) && Math.floor((n - 8)/10) <= 8) && (1 <= Math.floor((n - 8)%10) && Math.floor((n - 8)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n - 8)).alt) <= 0){
            Color_change(n - 8);
        };
        if((1 <= Math.floor((n + 12)/10) && Math.floor((n + 12)/10) <= 8) && (1 <= Math.floor((n + 12)%10) && Math.floor((n + 12)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n + 12)).alt) <= 0){
            Color_change(n + 12);
        };
        //右開きY
        if((1 <= Math.floor((n + 21)/10) && Math.floor((n + 21)/10) <= 8) && (1 <= Math.floor((n + 21)%10) && Math.floor((n + 21)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n + 21)).alt) <= 0){
            Color_change(n + 21);
        };
        if((1 <= Math.floor((n + 19)/10) && Math.floor((n + 19)/10) <= 8) && (1 <= Math.floor((n + 19)%10) && Math.floor((n + 19)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n + 19)).alt) <= 0){
            Color_change(n + 19);
        };
        //下開きY
        if((1 <= Math.floor((n + 8)/10) && Math.floor((n + 8)/10) <= 8) && (1 <= Math.floor((n + 8)%10) && Math.floor((n + 8)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n + 8)).alt) <= 0){
            Color_change(n + 8);
        };
        if((1 <= Math.floor((n - 12)/10) && Math.floor((n - 12)/10) <= 8) && (1 <= Math.floor((n - 12)%10) && Math.floor((n - 12)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n - 12)).alt) <= 0){
            Color_change(n - 12);
        };
        //左開きY
        if((1 <= Math.floor((n - 19)/10) && Math.floor((n - 19)/10) <= 8) && (1 <= Math.floor((n - 19)%10) && Math.floor((n - 19)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n - 19)).alt) <= 0){
            Color_change(n - 19);
        };
        if((1 <= Math.floor((n - 21)/10) && Math.floor((n - 21)/10) <= 8) && (1 <= Math.floor((n - 21)%10) && Math.floor((n - 21)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n - 21)).alt) <= 0){
            Color_change(n - 21);
        };
    }
    //黒ポーンの動き
    else if(m == 4){
        //最初の2マス
        if(n%10 == 7){
            if((1 <= Math.floor((n - 1)/10) && Math.floor((n - 1)/10) <= 8) && (1 <= Math.floor((n - 1)%10) && Math.floor((n - 1)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n - 1)).alt) == 0){
                Color_change(n - 1);
                if((1 <= Math.floor((n - 2)/10) && Math.floor((n - 2)/10) <= 8) && (1 <= Math.floor((n - 2)%10) && Math.floor((n - 2)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n - 2)).alt) == 0){
                    Color_change(n - 2);
                };
            };
        }
        //通常の1マス
        else{
            if((1 <= Math.floor((n - 1)/10) && Math.floor((n - 1)/10) <= 8) && (1 <= Math.floor((n - 1)%10) && Math.floor((n - 1)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n - 1)).alt) == 0){
            Color_change(n - 1);
            };
        };
        //右下に敵の駒
        if((1 <= Math.floor((n + 9)/10) && Math.floor((n + 9)/10) <= 8) && (1 <= Math.floor((n + 9)%10) && Math.floor((n + 9)%10) <= 8)){
            if(eval("img_" + (n + 9)).alt < 0){
                Color_change(n + 9);
            };
        };
        //左下に敵の駒
        if((1 <= Math.floor((n - 11)/10) && Math.floor((n - 11)/10) <= 8) && (1 <= Math.floor((n - 11)%10) && Math.floor((n - 11)%10) <= 8)){
            if(eval("img_" + (n - 11)).alt < 0){
                Color_change(n - 11);
            };
        };
    }
    //白ポーンの動き
    else if(m == -4){
        //最初の2マス
        if(n%10 == 2){
            if((1 <= Math.floor((n + 1)/10) && Math.floor((n + 1)/10) <= 8) && (1 <= Math.floor((n + 1)%10) && Math.floor((n + 1)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n + 1)).alt) == 0){
                Color_change(n + 1);
                if((1 <= Math.floor((n + 2)/10) && Math.floor((n + 2)/10) <= 8) && (1 <= Math.floor((n + 2)%10) && Math.floor((n + 2)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n + 2)).alt) == 0){
                    Color_change(n + 2);
                };
            };
        }
        //通常の1マス
        else{
            if((1 <= Math.floor((n + 1)/10) && Math.floor((n + 1)/10) <= 8) && (1 <= Math.floor((n + 1)%10) && Math.floor((n + 1)%10) <= 8) && (eval("img_" + n).alt * eval("img_" + (n + 1)).alt) == 0){
            Color_change(n + 1);
            };
        };
        //右上に敵の駒
        if((1 <= Math.floor((n + 11)/10) && Math.floor((n + 11)/10) <= 8) && (1 <= Math.floor((n + 11)%10) && Math.floor((n + 11)%10) <= 8)){
            if(eval("img_" + (n + 11)).alt > 0){
                Color_change(n + 11);
            };
        };
        //左上に敵の駒
        if((1 <= Math.floor((n - 9)/10) && Math.floor((n - 9)/10) <= 8) && (1 <= Math.floor((n - 9)%10) && Math.floor((n - 9)%10) <= 8)){
            if(eval("img_" + (n - 9)).alt > 0){
                Color_change(n - 9);
            };
        };
    }
    //クイーンの動き
    else if(Math.abs(m) == 5){
        Saltire_I(n);
        Cross_I(n);
        eval("img_" + n).classList.remove("komaMove")
    }
    //ルークの動き
    else if(Math.abs(m) == 6){
        Cross_I(n);
        eval("img_" + n).classList.remove("komaMove")
    };
};

//プロモーションの選択
function prom_choice(){
    return 5;
};

//メインの関数
function Chess(n){
    //自分の駒を触ったとき
    if(turn * eval("img_" + n).alt > 0){
        //さっきと同じ駒なら
        if(n == old_P){
            mode = 0;
            old_P = 0;
            Cas_F = 0;
            //行動範囲のクリーニング
            for(let i = 1; i <= 8; i++){
                for(let j = 1;j <= 8; j++){
                    let ij = (10 * i) + j
                    if(eval("img_" + ij).classList.contains("komaMove")){
                        eval("img_" + ij).classList.remove("komaMove");
                    };
                };
            };
        }
        //さっきと別の自分の駒
        else if(n != old_P){
            Cas_F = 0;
            //行動範囲のクリーニング
            for(let i = 1; i <= 8; i++){
                for(let j = 1;j <= 8; j++){
                    let ij = (10 * i) + j
                    if(eval("img_" + ij).classList.contains("komaMove")){
                        eval("img_" + ij).classList.remove("komaMove");
                    };
                };
            };

            Move_V(eval("img_" + n).alt,n);
            old_P = n;
            mode = 1;
        };
        }
    //自分の駒以外に触ったとき
    else if(turn * eval("img_" + n).alt <= 0){
        //駒を動かせるとき
        if(mode == 1){
            //駒を動す
            if(eval("img_" + n).classList.contains("komaMove")){
                //棋譜の記録
                let Ki = [];
                //各種数値
                Ki.push(turn);
                Ki.push(turnsum);
                Ki.push(flag_B);
                Ki.push(flag_W);
                Ki.push(flag1);
                Ki.push(flag2);
                Ki.push(flag3);
                Ki.push(flag4);
                //駒の位置
                for(let i = 1; i <= 8; i++){
                    for (let j = 1; j <= 8; j++){
                        let ij = (10 * i) + j;
                        Ki.push(eval("img_" + ij).alt)
                    };
                };

                kifu.push(Ki)

                //キングとルークが動いたかどうか
                if(old_P == 18){flag1 = 1;};
                if(old_P == 88){flag2 = 1;};
                if(old_P == 11){flag3 = 1;};
                if(old_P == 81){flag4 = 1;};
                if(old_P == 58){flag_B = 1;};
                if(old_P == 51){flag_W = 1;};

        //駒の移動
            //キャスリング
                //黒キング
                if(old_P == 58 && n== 38){
                    img_18.alt = 0;
                    img_38.alt = 2;
                    img_48.alt = 6;
                    img_58.alt = 0;
                    changeImage(18);
                    changeImage(38);
                    changeImage(48);
                    changeImage(58);
                }
                else if(old_P == 58 && n == 78){
                    img_58.alt = 0;
                    img_68.alt = 6;
                    img_78.alt = 2;
                    img_88.alt = 0;
                    changeImage(58);
                    changeImage(68);
                    changeImage(78);
                    changeImage(88);
                }
                //白キング
                else if(old_P == 51 && n == 31){
                    img_11.alt = 0;
                    img_31.alt = -2;
                    img_41.alt = -6;
                    img_51.alt = 0;
                    changeImage(11);
                    changeImage(31);
                    changeImage(41);
                    changeImage(51);
                }
                else if(old_P == 51 && n == 71){
                    img_51.alt = 0;
                    img_61.alt = -6;
                    img_71.alt = -2;
                    img_81.alt = 0;
                    changeImage(51);
                    changeImage(61);
                    changeImage(71);
                    changeImage(81);
                }
                //黒ポーンのプロモーション
                else if(eval("img_" + old_P).alt == 4 && n%10 == 1){
                    eval("img_" + n).alt = prom_choice();
                    eval("img_" + old_P).alt = 0;
                    changeImage(n);
                    changeImage(old_P);
                }
                //白ポーンのプロモーション
                else if(eval("img_" + old_P).alt == -4 && n%10 == 8){
                    eval("img_" + n).alt = prom_choice() * (-1);
                    eval("img_" + old_P).alt = 0;
                    changeImage(n);
                    changeImage(old_P);
                }
            //その他
                else{
                    //駒の画像の入れ替え
                    eval("img_" + n).alt = eval("img_" + old_P).alt;
                    eval("img_" + old_P).alt = 0;
                    changeImage(n);
                    changeImage(old_P);
                };

                mode = 0;
                Cas_F = 0;
                turn = turn * (-1);
                turnsum = turnsum + 1;

                //行動範囲のクリーニング
                for(let i = 1; i <= 8; i++){
                    for(let j = 1;j <= 8; j++){
                        let ij = (10 * i) + j
                        if(eval("img_" + ij).classList.contains("komaMove")){
                            eval("img_" + ij).classList.remove("komaMove");
                        };
                    };
                };
            }
            //モードを戻す
            else{
                mode = 0;
                old_P =0;
                Cas_F = 0;
                //行動範囲のクリーニング
                for(let i = 1; i <= 8; i++){
                    for(let j = 1;j <= 8; j++){
                        let ij = (10 * i) + j
                        if(eval("img_" + ij).classList.contains("komaMove")){
                            eval("img_" + ij).classList.remove("komaMove");
                        };
                    };
                };
            };
        };
    };
};

//リセット
function Reset(){
    //各種数値
    mode = 0;
    turn = -1;
    turnsum = 0;
    old_P = 0;
    flag_B = 0;
    flag_W = 0;
    flag1 = 0;
    flag2 = 0;
    flag3 = 0;
    flag4 = 0;
    Cas_F = 0;
    kifu = [];

    //黒1段目
    img_18.src = "../images/PLAY/chesspieces/bR.png";
    img_18.alt = 6;
    img_28.src = "../images/PLAY/chesspieces/bN.png";
    img_28.alt = 3;
    img_38.src = "../images/PLAY/chesspieces/bB.png";
    img_38.alt = 1;
    img_48.src = "../images/PLAY/chesspieces/bQ.png";
    img_48.alt = 5;
    img_58.src = "../images/PLAY/chesspieces/bK.png";
    img_58.alt = 2;
    img_68.src = "../images/PLAY/chesspieces/bB.png";
    img_68.alt = 1;
    img_78.src = "../images/PLAY/chesspieces/bN.png";
    img_78.alt = 3;
    img_88.src = "../images/PLAY/chesspieces/bR.png";
    img_88.alt = 6;

    //黒2段目
    img_17.src = "../images/PLAY/chesspieces/bP.png";
    img_17.alt = 4;
    img_27.src = "../images/PLAY/chesspieces/bP.png";
    img_27.alt = 4;
    img_37.src = "../images/PLAY/chesspieces/bP.png";
    img_37.alt = 4;
    img_47.src = "../images/PLAY/chesspieces/bP.png";
    img_47.alt = 4;
    img_57.src = "../images/PLAY/chesspieces/bP.png";
    img_57.alt = 4;
    img_67.src = "../images/PLAY/chesspieces/bP.png";
    img_67.alt = 4;
    img_77.src = "../images/PLAY/chesspieces/bP.png";
    img_77.alt = 4;
    img_87.src = "../images/PLAY/chesspieces/bP.png";
    img_87.alt = 4;

    //白2段目
    img_12.src = "../images/PLAY/chesspieces/wP.png";
    img_12.alt = -4;
    img_22.src = "../images/PLAY/chesspieces/wP.png";
    img_22.alt = -4;
    img_32.src = "../images/PLAY/chesspieces/wP.png";
    img_32.alt = -4;
    img_42.src = "../images/PLAY/chesspieces/wP.png";
    img_42.alt = -4;
    img_52.src = "../images/PLAY/chesspieces/wP.png";
    img_52.alt = -4;
    img_62.src = "../images/PLAY/chesspieces/wP.png";
    img_62.alt = -4;
    img_72.src = "../images/PLAY/chesspieces/wP.png";
    img_72.alt = -4;
    img_82.src = "../images/PLAY/chesspieces/wP.png";
    img_82.alt = -4;

    //白1段目
    img_11.src = "../images/PLAY/chesspieces/wR.png";
    img_11.alt = -6;
    img_21.src = "../images/PLAY/chesspieces/wN.png";
    img_21.alt = -3;
    img_31.src = "../images/PLAY/chesspieces/wB.png";
    img_31.alt = -1;
    img_41.src = "../images/PLAY/chesspieces/wQ.png";
    img_41.alt = -5;
    img_51.src = "../images/PLAY/chesspieces/wK.png";
    img_51.alt = -2;
    img_61.src = "../images/PLAY/chesspieces/wB.png";
    img_61.alt = -1;
    img_71.src = "../images/PLAY/chesspieces/wN.png";
    img_71.alt = -3;
    img_81.src = "../images/PLAY/chesspieces/wR.png";
    img_81.alt = -6;

    //残りのマス
    for(let i = 1; i <= 8; i++){
        for(let j = 3; j <= 6; j++){
            let ij = (10 * i) + j
            eval("img_" + ij).src = "../images/PLAY/chesspieces/empty.png";
            eval("img_" + ij).alt = 0;
        };
    };
    //行動範囲のクリーニング
    for(let i = 1; i <= 8; i++){
        for(let j = 1;j <= 8; j++){
            let ij = (10 * i) + j
            if(eval("img_" + ij).classList.contains("komaMove")){
                eval("img_" + ij).classList.remove("komaMove");
            };
        };
    };
};