document.addEventListener('DOMContentLoaded', function(){

    var SCREEN_SIZE = 500,
        SIDE_CELLS  = 200,
        CELL_SIZE   = SCREEN_SIZE / SIDE_CELLS,
        scaleRate   = Math.min(window.innerHeight / SCREEN_SIZE, window.innerHeight / SCREEN_SIZE), // 画面引き伸ばし率
        FPS         = 200,
        canvas      = document.getElementById('canvas'),
        ctx         = canvas.getContext('2d'),
        field       = new Array(SIDE_CELLS),  //画面のセルを格納する配列
        //４方向の移動量
        dirs = [
            {'row' : -1, 'col' : 0},  //上に移動
            {'row' : 0, 'col' : 1},   //右に移動
            {'row' : 1, 'col' : 0},   //下に移動
            {'row' : 0, 'col' : -1}   //左に移動
        ],
        //アリのプロパティ
        ant = {
            'dir' : 0,                   //方向
            'row' : SIDE_CELLS / 2 - 1,  //縦位置
            'col' : SIDE_CELLS / 2 - 1   //横位置
        };

    //描画
    var update = function(){
        //セルが白の場合（1）
        if (field[ant.row][ant.col]) {
            ant.dir--;
            ctx.fillStyle = 'rgb(0,0,0)';
        }
        //セルが黒の場合（0）
        else {
            ant.dir++;
            ctx.fillStyle = 'rgb(255,255,255)';
        }
        //セルの色を反転（0 or 1）
        field[ant.row][ant.col] = 1 - field[ant.row][ant.col];
        //セルを描画
        ctx.fillRect(ant.col*CELL_SIZE, ant.row*CELL_SIZE, CELL_SIZE, CELL_SIZE);

        //アリの方向を修正（必ず0,1,2,3のどれかになる）
        ant.dir = (ant.dir+4) % 4;
        //アリの位置を更新（dirsの値をプラスしてる）
        ant.row += dirs[ant.dir].row;
        ant.col += dirs[ant.dir].col;
        ctx.fillStyle = 'rgb(0,255,50)';
        //アリを描画
        ctx.fillRect(ant.col*CELL_SIZE, ant.row*CELL_SIZE, CELL_SIZE, CELL_SIZE);

        //アリが画面外に出たら終了
        if (ant.col*CELL_SIZE < 0 || ant.col*CELL_SIZE > SCREEN_SIZE || ant.row*CELL_SIZE < 0 || ant.row*CELL_SIZE > SCREEN_SIZE) {
            alert('ant has gone...');
            return;
        }
        //再帰処理
        setTimeout(update, 1000/FPS);
    };

    var init = function(){
        canvas.width = canvas.height = SCREEN_SIZE;
        canvas.style.height = canvas.style.width = SCREEN_SIZE * scaleRate + 'px';

        //すべてのセルを黒に設定
        for (var i = 0; i < SIDE_CELLS; i++) {
            field[i] = new Array(SIDE_CELLS);

            for (var j = 0; j < SIDE_CELLS; j++) {
                field[i][j] = 0;
            }
        }
        update();
    };

    init();

});