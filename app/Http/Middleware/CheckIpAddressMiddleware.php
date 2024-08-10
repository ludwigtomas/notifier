<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckIpAddressMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $allowedIp = '109.80.147.80'; // Replace with your public IP address

        // Check the X-Forwarded-For header for the public IP address
        $ipAddress = $request->header('X-Forwarded-For') ?? $request->ip();

        if ($ipAddress !== $allowedIp) {
            return response()->json([
                'message' => 'Unauthorized',
                'ip' => $request->ip(),
                'header' => $request->header('X-Forwarded-For'),
            ], 403);
        }

        return $next($request);
    }
}
