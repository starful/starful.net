// アプリケーションの実行
$(function(){
    var app = new Recomegirl();
    app.run();
});


// コンストラクタ
// ----------------------------------------------
Recomegirl = function() {
    // 各フェーズの要素を取得
    this.elem = {
        introduction:   $('#introduction'),
        select:         $('#select'),
        input:          $('#input'),
        recommend:      $('#recommend'),
        unsupported:    $('#unsupported')
    };
};


// 実行メソッド
// ----------------------------------------------
Recomegirl.prototype.run = function() {
    var hash;
    
    // 共通項目の初期化
    this._init();
    // ブラウザ判定
    if(!$.browser.webkit) {
        // 未対応画面の表示
        this._showUnsupportedPhase();
        return;
    }
    
    // URLフラグメントハッシュの取得
    this.fragment = this._parseFragmentHash();
    // フェーズを表示
    this._showPhase(this.fragment.phase);
};


// 共通項目の初期化
// ----------------------------------------------
Recomegirl.prototype._init = function() {
    // Overviewのイベント処理
	$('#overview').bind('click', function(){
	    $.scrollTo($('#overview'), 300);
	    return true;
	});
};


// FragmentHash解析メソッド
// ----------------------------------------------
Recomegirl.prototype._parseFragmentHash = function() {
    var type, type_pattern, hash = {};
    
    // 各パラメータを取得
	if(location.hash.match(/#!\/([a-z_]+)\/?(([a-z0-9_]+)\/?)?(([1-9]+)\/?)?(q\/([^\/]+)\/?)?(id\/([^\/]+)\/?)?/)) {
	    hash['phase'] = RegExp.$1;
	    hash['type'] = RegExp.$3;
	    hash['video'] = RegExp.$5;
	    hash['query'] = RegExp.$7;
	    hash['id'] = RegExp.$9;
	}
	
	// サービスタイプ配列を生成
    types = [
        'yahoo_auction', 'rakuten_shopping', 'allcoupon', 
        'groupon', 'ameba_vision', 'artbeat', 
        'r25', 'coneco', 'suntory_barnavi'
    ];
    //　サービスタイプ配列から正規表現パターンを生成
    type_pattern = new RegExp('('+types.join('|')+')');
    
	// 未対応のサービスタイプなら無視する
    if(hash.type && !hash.type.match(type_pattern))　{
        return　{ phase: "" };
    }
	
	return hash;
};


// フェーズ表示メソッド
// ----------------------------------------------
Recomegirl.prototype._showPhase = function(phase) {
    // フェーズごとに実行
    switch(phase) {
        case 'select':
            this._showSelectPhase();
            break;
        case 'input':
            this._showInputPhase();
            break;
        case 'recommend':
            this._showRecommendPhase();
            break;
        default:
            this._showIntroductionPhase();
            break;
    }
};


// Unsupported表示メソッド
// ----------------------------------------------
Recomegirl.prototype._showUnsupportedPhase = function() {
    var elem, img, state, src;
    
    // フェーズの要素を取得
    elem = this.elem.unsupported;
    // 要素を取得
    img = $('img', elem);
    // 状態を初期化
    state = 1;
    
    // 画像切替ループ
    setInterval(function(){
        // 画像を切替
    	img.attr('src', 'images/unsupported0'+state+'.jpg');
    	// 状態の更新
    	state = (state==2) ? 1 : 2;
    }, 2000);
    
    //　フェーズの切り替え
    this._changePhase(this.elem.introduction, elem);
};


// Introduction表示メソッド
// ----------------------------------------------
Recomegirl.prototype._showIntroductionPhase = function() {
	var timer, r = this;
    
    // イベントハンドラを生成
    var handler = function() {
        // Selectフェーズを表示
        r._showSelectPhase();
        // タイマーの初期化
		clearTimeout(timer);
    };
    
    // スキップボタンのイベント処理
    $('.skip', this.elem.introduction).bind('click',　handler);
    // 表示判定タイマーをセット
    timer = setTimeout(handler, 15500);
};


// Select表示メソッド
// ----------------------------------------------
Recomegirl.prototype._showSelectPhase = function() {
    var elem, list, r = this;
    
    // フェーズの要素を取得
    elem = this.elem.select;

    // リスト要素を取得
    var list = $('ul li img', elem);
    // リスト要素のイベント処理
    list.bind('click', function(){
        // サービスタイプを取得
        r.type = $(this).attr('class');
        // Inputフェーズを表示
        r._showInputPhase();
    });

    // キャラクター切り替えエフェクトを設定
    this._initCharacterEffect($('.character .girl', elem));
    // フェーズの切り替え
    this._changePhase(this.elem.introduction, elem);
    // URLの更新
    location.hash = '#!/select/';
};


// Input表示メソッド
// ----------------------------------------------
Recomegirl.prototype._showInputPhase = function() {
    var elem, exec = 0, r = this;
    
    // フェーズの要素を取得
    elem = this.elem.input;
    // Introductionを非表示に
    this._hide(this.elem.introduction);
    
    // サービスタイプの初期化
    this.type = this.fragment.type || this.type;
    // サービスタイプに対応する要素を表示
    this._show($('.'+this.type, elem));
    
    // イベントハンドラを生成
    var handler = function(e) {
        // Enterキー以外は無視
	    if(exec || (e.type=='keypress' && e.keyCode!=13)) { 
	        return;
	    }
	    // 実行フラグを有効化
        exec = 1;
        
        // video要素を取得
        var video = $('video', elem).get(0);
        // video要素を取得の一時停止
        video.pause();
        
        // 動画番号を算出して保存
        r.video = parseInt(video.currentTime/5) + 1;
        // 検索クエリを取得して保存
        r.query = $(this).val() || $('option:selected', $(this)).val();
        
        // Recommendフェーズを表示
        r._showRecommendPhase();
    };
    
    // 入力要素のイベント
	$('input', elem).bind('keypress', handler);
	$('select', elem).bind('change', handler);
    
    // キャラクター切り替えエフェクトを設定
    this._initCharacterEffect($('.character .girl', elem));
    // フェーズの切り替え
    this._changePhase(this.elem.select, elem);
    // URLの更新
    location.hash = '#!/input/'+this.type+'/';
};


// Recommend表示メソッド
// ----------------------------------------------
Recomegirl.prototype._showRecommendPhase = function() {
    var elem, video, r = this;
    
    // フェーズの要素を取得
    elem = this.elem.recommend;
    // Introductionを非表示に
    this._hide(this.elem.introduction);
    
    // 動画番号の初期化
    this.video = this.fragment.video || this.video;
    // 現在のビデオ時刻から、動画を決定
    this.video = this._getVideoData(this.video);
    // ビデオをフェーズ要素に追加
    elem.append(this.video.elem);
    
    // サービスタイプの初期化
    this.type = this.fragment.type || this.type;
    // クエリの初期化
    this.query = this.fragment.query || this.query || '';
    
    // フェーズの切り替え
    this._changePhase(this.elem.input, elem);
    // URLの更新
    location.hash = '#!/recommend/'+this.type+'/'+this.video.type+'/q/'+this.query;
    
    // APIからデータを取得
    $.get(
        "api/recomegirl.pl",
        { type: this.type, query: this.query },
        this._activateRecommendPhase()
    );
};


// Recommend有効化メソッド
// ----------------------------------------------
Recomegirl.prototype._activateRecommendPhase = function() {
    var r = this;
    return function(data) {
        var elem, loading, message, status;

        // フェーズの要素を取得
        elem = r.elem.recommend;
        // 読み込み中表示要素
        loading = $('.loading', elem);
    	// メッセージ部分の要素を取得
    	message = $('.'+r.type, elem);

        // 検索結果が0だった場合の処理
        if(data.error == 202) {
            // 要素の取得
            var notfound = $('.notfound', elem);
            // メッセージ部分を非表示に
            r._hide($('.message_box', elem));
            // 読み込み画面を非表示に
            r._changePhase(loading, notfound);
            // replayボタンのURLを変更
            $('.replay a', notfound).attr('href', 'redirect.html#!/input/'+r.type);
            return;
        }
        
        // videoの種類をクラスに付加する
		message.addClass('video'+r.video.type);
	    // テンプレートを埋込み
	    r._applyTemplate(message, data);
	    // video要素を表示
	    r._show($('video', elem));
	    
	    // Tweet用メッセージを生成
	    status = 'レコメガールにこんなのオススメされたよ。';
	    status += 'http://tatsuaki.net/recomegirl/#!/recommend/'+r.type+'/'+r.video.type+'/q/'+r.query;
	    status += ' #recomegirl';
	    status = encodeURIComponent(status);
	    // ボタン用URLを生成して埋込み
        $('.tweet a', elem).attr('href', 'http://twitter.com/home?status='+status);
        
        // プレイヤーを生成
    	var player = new Discovery($("#player"));
    	// イベントハンドラを設定
    	player.bind('play', function(){
    	    // 読み込み画面を非表示にして、メッセージを表示
    	    r._changePhase(loading, message);
    	});
    	
        // メタ情報を設定
        player.activate({
            video: r.video.elem,
            image: data.image,
            meta:  {
                pin: "video/0"+r.video.type+"/pin.txt",
                tracking: "video/0"+r.video.type+"/tracking.txt"
            },
            delay: r.video.delay
        });
        // 再生開始
        player.play();
    };
};


// ビデオデータ取得メソッド
// ----------------------------------------------
Recomegirl.prototype._getVideoData = function(type) {
    var delay, html;
    
    // 画像遅延情報配列
    var delay = [0, 56, 75, 64, 55, 94, 24, 78];
    // ビデオ要素を生成
    var html = '';
    html += '<video width="854" height="480">';
    html += '<source src="video/0'+type+'/video.mp4">';
    html += '</video>';
    
    return {
        type:   type,
        delay:  delay[type],
        elem:   $(html)
    };
};


// テンプレート適用メソッド
// ----------------------------------------------
Recomegirl.prototype._applyTemplate = function(elem, data) {
    // メッセージにテンプレートを埋込み
	elem.children().each(function(){
		var html = $(this).html();
		html = html.replace('{item1}', data.item1);
		html = html.replace('{item2}', data.item2);
		$(this).html(html);
	});
	// URLを埋込み
	$('.step5 a', elem).attr('href', data.url);
};


// 画像切替エフェクト初期化メソッド
// ----------------------------------------------
Recomegirl.prototype._initCharacterEffect　= function(elem) {
    // 画像番号配列
    var images = ['11', '03', '04', '05', '07', '08', '09', '10'];
    // 画像切替ループ
    setInterval(function(){
        var num = parseInt(Math.random()*images.length);
    	elem.attr('src', './images/0'+images[num]+'.png');
    }, 5000);
};


// フェーズ切り替えメソッド
// ----------------------------------------------
Recomegirl.prototype._changePhase = function(current, next) {
    // 次のフェーズを表示して、現在のフェーズを非表示に
    this._show(next);
    this._hide(current);
};


// 要素表示メソッド
// ----------------------------------------------
Recomegirl.prototype._show = function(elem) {
    elem.css('display', 'block');
};


// 要素非表示メソッド
// ----------------------------------------------
Recomegirl.prototype._hide = function(elem) {
    elem.css('display', 'none');
};

